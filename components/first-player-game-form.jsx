import { Button } from 'react-bootstrap';

function FirstPlayerGameForm({ gameState, sendingTransaction, solve }) {
  const isFirstPlayerTurn = gameState.secondPlayerMove !== 0;

  if (!isFirstPlayerTurn) {
    return (<h4>Waiting for opponent to play</h4>);
  }

  return (
    <div>
      <h4>Its your turn make your move</h4>
      <div><Button variant="primary" onClick={solve} disabled={sendingTransaction}>Solve</Button></div>
    </div>
  );
}

export default FirstPlayerGameForm;
