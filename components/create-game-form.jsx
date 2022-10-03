import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import MoveList from './move-list';
import { isBlank, isDecimal, isInRange } from '../utils/general';

const Wrapper = styled.div`
    width: 50%;
    margin: 12px auto;
`;

function CreateGameForm({ createGame }) {
  const [values, setValues] = useState({
    address: '',
    move: 0,
    stake: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const errors = validate();
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
    } else {
      createGame(values.move, values.address, values.stake);
    }
  };

  const validate = () => {
    const errors = {};
    if (isBlank(values.address)) {
      errors.address = 'Can not be blank';
    }
    if (!isDecimal(values.stake)) {
      errors.stake = 'Provide valid stake';
    }
    if (!isInRange(values.move, 1, 5)) {
      errors.move = 'Move should be valid';
    }
    return errors;
  };

  return (
    <Wrapper>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicSecondPlayerAddress">
          <Form.Label>Second player Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter second player address"
            value={values.address}
            isInvalid={errors.address !== undefined}
            onChange={(e) => setValues({ ...values, address: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicStake">
          <Form.Label>Game stake</Form.Label>
          <Form.Control
            type="text"
            placeholder="Game stake"
            value={values.stake}
            isInvalid={errors.stake !== undefined}
            onChange={(e) => setValues({ ...values, stake: e.target.value })}
          />
        </Form.Group>
        <MoveList value={values.move} handleChange={(val) => (setValues({ ...values, move: val }))} />
        <Button
          variant="primary"
          size="lg"
          onClick={handleSubmit}
        >
          Create Game
        </Button>
      </Form>
    </Wrapper>
  );
}

export default CreateGameForm;
