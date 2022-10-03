import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import useEthAccount from '../hooks/use-eth-account';
import { equalsIgnoreCase } from '../utils/general';
import FirstPlayerGameForm from './first-player-game-form';
import SecondPlayerGameForm from './second-player-game-form';

const Wrapper = styled.div`
    width: 50%;
    margin: 12px auto;
    text-align: center;
`;

function GameForm({
  gameState, sendingTransaction, closeGame, sendSecondPlayerMove, solve, callOpponentTimeout,
}) {
  const { account } = useEthAccount();
  const [lastActionTimedOut, setLastActionTimedOut] = useState(false);

  useEffect(() => {
    if (gameState.lastAction) {
      const expireTimeStamp = (gameState.lastAction * 1000 + gameState.timeout * 1000) - Date.now();
      if (expireTimeStamp <= 0) {
        setLastActionTimedOut(true);
      } else {
        setLastActionTimedOut(false);
        const id = setTimeout(() => { setLastActionTimedOut(true); }, expireTimeStamp);
        return () => clearTimeout(id);
      }
    }
  }, [gameState]);

  if (gameState.stake === '0') {
    return (
      <Wrapper>
        <h4>Game is finished please check you balance, close to start new one</h4>
        <Button variant="primary" onClick={closeGame}>Close Game</Button>
      </Wrapper>
    );
  }

  const isFirstPlayer = () => equalsIgnoreCase(account, gameState.firstPlayerAddress);

  const isOpponentTimedOut = () => lastActionTimedOut && (isFirstPlayer() && gameState.secondPlayerMove === 0
            || !isFirstPlayer() && gameState.secondPlayerMove !== 0);

  return (
    <Wrapper>
      <div>
        {isFirstPlayer() ? <FirstPlayerGameForm gameState={gameState} sendingTransaction={sendingTransaction} solve={solve} />
          : <SecondPlayerGameForm gameState={gameState} sendingTransaction={sendingTransaction} sendMove={sendSecondPlayerMove} />}
      </div>
      {isOpponentTimedOut() && (
        <div>
          <h4>Opponent has timed out</h4>
          <Button variant="primary" onClick={callOpponentTimeout} disabled={sendingTransaction}>Claim Stake</Button>
        </div>
      )}
    </Wrapper>
  );
}

export default GameForm;
