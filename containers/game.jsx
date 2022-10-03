import { useEffect, useState } from 'react';

import useEthAccount from '../hooks/use-eth-account';
import { storeGame, loadGame, closeGame as closeGameApi } from '../services/api';
import Loading from '../components/loading';
import CreateGameForm from '../components/create-game-form';
import { abi, byteCode } from '../contracts/rps';
import {
  equalsIgnoreCase, getSalt, getValue, solidityKeccak256, storeValue,
} from '../utils/general';
import { useContractUtils } from '../hooks/use-contract-utils';
import GameForm from '../components/game-form';
import useWeb3 from '../hooks/use-web3';

const GameStatus = {
  NotCreated: 'not_created',
  Creating: 'creating',
  Created: 'created',
};

export default function Game() {
  const { account } = useEthAccount();
  const web3 = useWeb3();
  const { deploy, send, syncState } = useContractUtils();

  const [gameStatus, setGameStatus] = useState(GameStatus.NotCreated);
  const [gameContract, setGameContract] = useState(null);
  const [gameState, setGameState] = useState({});
  const [sendingTransaction, setSendingTransaction] = useState(false);

  useEffect(() => {
    loadGame(account).then((res) => {
      if (res != null) {
        setGameStatus(GameStatus.Created);
        setGameContract(new web3.eth.Contract(abi, res.gameAddress));
      }
    });
  }, [account]);

  const createGame = async (move, secondPlayerAddress, stake) => {
    try {
      setGameStatus(GameStatus.Creating);
      if (equalsIgnoreCase(secondPlayerAddress, account)) {
        alert("you can't play with yourself");
        throw 'Trying to play with own self';
      }
      const salt = web3.utils.randomHex(32);
      const moveHash = solidityKeccak256(['uint8', 'uint256'], [move, salt]);
      const deployedGame = await deploy(abi, byteCode, [moveHash, secondPlayerAddress], stake);
      await storeGame(account, secondPlayerAddress, deployedGame.options.address);
      storeValue(`salt-${deployedGame.options.address}`, salt);
      storeValue(`move-${deployedGame.options.address}`, move);
      setGameContract(deployedGame);
      setGameStatus(GameStatus.Created);
    } catch (e) {
      setGameStatus(GameStatus.NotCreated);
    }
  };

  const closeGame = async () => {
    try {
      await closeGameApi(gameContract.options.address);
    } finally {
      clearState();
    }
  };

  const clearState = () => {
    setGameStatus(GameStatus.NotCreated);
    setGameContract(null);
    setGameState({});
  };

  useEffect(() => {
    if (gameStatus === GameStatus.Created) {
      return syncState(gameContract, ['j1', 'j2', 'c2', 'stake', 'lastAction', 'TIMEOUT'], (state) => {
        setGameState(mapContractStateToGameState(state));
      });
    }
  }, [gameStatus]);

  const mapContractStateToGameState = (contractState) => ({
    firstPlayerAddress: contractState.j1,
    secondPlayerAddress: contractState.j2,
    secondPlayerMove: parseInt(contractState.c2),
    stake: contractState.stake,
    lastAction: parseInt(contractState.lastAction),
    timeout: contractState.TIMEOUT,
  });

  const sendSecondPlayerMove = async (move) => {
    try {
      setSendingTransaction(true);
      await send(gameContract, 'play', [move], web3.utils.fromWei(gameState.stake));
    } finally {
      setSendingTransaction(false);
    }
  };

  const solve = async () => {
    try {
      setSendingTransaction(true);
      const move = getValue(`move-${gameContract.options.address}`);
      const salt = getValue(`salt-${gameContract.options.address}`);
      await send(gameContract, 'solve', [move, salt]);
    } finally {
      setSendingTransaction(false);
    }
  };

  const callOpponentTimeout = async () => {
    try {
      const methodName = equalsIgnoreCase(account, gameState.firstPlayerAddress) ? 'j2Timeout' : 'j1Timeout';
      await send(gameContract, methodName, []);
    } finally {
      setSendingTransaction(false);
    }
  };

  if (gameStatus === GameStatus.NotCreated) {
    return (<CreateGameForm createGame={createGame} />);
  } if (gameStatus === GameStatus.Creating) {
    return (<Loading text="Creating contract please don't close" />);
  }
  return (
    <GameForm
      closeGame={closeGame}
      gameState={gameState}
      sendSecondPlayerMove={sendSecondPlayerMove}
      solve={solve}
      callOpponentTimeout={callOpponentTimeout}
      sendingTransaction={sendingTransaction}
    />
  );
}
