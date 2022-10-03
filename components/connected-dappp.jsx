import useEthAccount from '../hooks/use-eth-account';
import Loading from './loading';

function ConnectedDapp({ children }) {
  const { isConnected } = useEthAccount();
  if (!isConnected) {
    return (<Loading text="Please connect metamask Ropsten accounts all" />);
  }

  return (<>{children}</>);
}

export default ConnectedDapp;
