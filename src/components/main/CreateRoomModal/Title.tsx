import { useState } from 'react';
import styled from 'styled-components';
import Error from './Error';

export default function Title({ title, onChange }) {
  const [error, setError] = useState(false);

  const onBlur = () => {
    if (!title) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <Container>
      <Label htmlFor="title">방 이름 *</Label>
      <Input
        id="title"
        name="title"
        type="text"
        value={title}
        onChange={onChange}
        placeholder="방 이름을 입력해주세요. (14자 이내)"
        required
        onBlur={onBlur}
        maxLength={14}
        data-cy="create-room-modal-title"
      />
      {error && <Error />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
  position: relative;
`;

const Label = styled.label`
  width: 100%;
  line-height: 2.9rem;
`;

const Input = styled.input`
  height: 4.9rem;
  width: 100%;
  margin-top: 0.25rem;
  background: transparent;
  outline: none;
  color: #f9fafb;
  font-size: 1.5rem;
  background-color: #191f28;
  border-radius: 0.6rem;
  padding: 0 1.6rem;
`;
