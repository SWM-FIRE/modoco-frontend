import { useState } from 'react';
import styled from 'styled-components';
import Error from './Error';

export default function RoomPassword({ roomPassword, onChange }) {
  const [error, setError] = useState(false);
  console.log(error);
  const onBlur = () => {
    if (!roomPassword) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <Container>
      <Label htmlFor="roomPassword">방 비밀번호 *</Label>
      <Input
        id="roomPassword"
        name="roomPassword"
        type="text"
        value={roomPassword}
        onChange={onChange}
        placeholder="비밀번호를 입력해주세요."
        required
        onBlur={onBlur}
        data-cy="create-room-modal-pw"
      />
      {error && <Error />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.9rem;
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
