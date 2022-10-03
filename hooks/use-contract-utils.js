import useEthAccount from './use-eth-account';
import useWeb3 from './use-web3';

export const useContractUtils = () => {
  const { account } = useEthAccount();
  const web3 = useWeb3();
  const deploy = async (abi, byteCode, args, value) => {
    const contract = new web3.eth.Contract(abi);

    const contractDeploy = contract.deploy({
      data: byteCode,
      arguments: args,
    });
    const sendOptions = {
      from: account,
    };
    if (value) {
      sendOptions.value = web3.utils.toWei(value);
    }
    const gas = await contractDeploy.estimateGas(sendOptions);
    const gasPrice = await web3.eth.getGasPrice();
    return contractDeploy.send({ ...sendOptions, gas, gasPrice });
  };

  const send = async (contract, methodName, args, value) => {
    const gasPrice = await web3.eth.getGasPrice();
    const sendOptions = {
      from: account,
    };
    if (value) {
      sendOptions.value = web3.utils.toWei(value);
    }
    const method = contract.methods[methodName](...args);
    const gas = await method.estimateGas(sendOptions);
    return method.send({ ...sendOptions, gas, gasPrice });
  };

  const syncState = (contract, fields, handleState) => {
    fetchState(contract, fields).then((res) => {
      handleState(res);
    });
    const subscription = web3.eth.subscribe('newBlockHeaders', (err, res) => {
      if (err) {
        console.log(res);
      }
    });

    subscription.on('data', () => {
      fetchState(contract, fields).then((res) => {
        handleState(res);
      });
    });

    return () => subscription.unsubscribe(() => {});
  };

  const fetchState = async (contract, fields) => {
    const fetchedState = {};
    for (const field of fields) {
      fetchedState[field] = await contract.methods[field]().call();
    }
    return fetchedState;
  };

  return { deploy, send, syncState };
};
