import { useState } from 'react';
import { Button } from 'react-bootstrap';
import MoveList from './move-list';

function SecondPlayerGameForm({ gameState, sendingTransaction, sendMove }) {
  const isSecondPlayerTurn = gameState.secondPlayerMove === 0;
  const [secondPlayerMove, setSecondPlayerMove] = useState(0);

  if (!isSecondPlayerTurn) {
    return (<h4>Waiting for opponent to play</h4>);
  }

  return (
    <div>
      <h4>Its your turn make your move</h4>
      <MoveList value={secondPlayerMove} handleChange={(val) => setSecondPlayerMove(val)} />
      <div><Button variant="primary" onClick={() => sendMove(secondPlayerMove)} disabled={sendingTransaction}>Send Move</Button></div>
    </div>
  );
}

export default SecondPlayerGameForm;
