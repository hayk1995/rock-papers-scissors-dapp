import { Form } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 12px 0;
`;

function MoveList({ value, handleChange }) {
  const moves = ['null', 'Rock', 'Paper', 'Scissors', 'Spock', 'Lizard'];
  return (
    <Wrapper>
      {moves.map((move, index) => (
        move !== 'null' && (
        <Form.Check
          checked={value === index}
          value={index}
          onChange={(e) => handleChange(parseInt(e.target.value))}
          inline
          label={move}
          name="group1"
          type="radio"
          id={`inline-${move}-1`}
          key={move}
        />
        )
      ))}
    </Wrapper>
  );
}

export default MoveList;
