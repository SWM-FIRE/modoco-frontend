import { useState } from 'react';
import styled from 'styled-components';
import Error from './Error';

export default function Private({ isPublic, password, onChange }) {
  const [error, setError] = useState(false);
  const onBlur = () => {
    if (!password) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <Component>
      <Type>공개 여부 *</Type>
      <Inputs>
        <Label>
          <Input
            type="radio"
            id="isPublic"
            name="isPublic"
            value="true"
            onChange={onChange}
            checked={isPublic}
          />
          공개 코딩방
        </Label>
        <Label>
          <Input
            type="radio"
            id="isPublic"
            name="isPublic"
            value="false"
            onChange={onChange}
            data-cy="create-room-modal-private"
          />
          비공개 코딩방
          <PasswordInput
            id="password"
            name="password"
            type="text"
            value={password}
            onChange={onChange}
            placeholder="비밀번호 4글자"
            required
            onBlur={onBlur}
            readOnly={isPublic}
            data-cy="create-room-modal-pw"
            maxLength={4}
            minLength={4}
          />
        </Label>
        {error && !isPublic && <Error />}
      </Inputs>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.9rem;
  width: 100%;
  position: relative;
`;

const Type = styled.div`
  width: 100%;
  line-height: 2.9rem;
`;

const Inputs = styled.div`
  display: flex;
  width: 100%;
  color: #f9fafb;
  font-size: 1.5rem;
  gap: 3rem;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  input[type='radio']:checked {
    appearance: none;
    background-color: #ffffff;
    border: 0.7rem solid #94a3b8;
    border-radius: 50%;
  }
`;

const Input = styled.input`
  margin-right: 0.8rem;
  border: 1px solid #94a3b8;
  width: 2.2rem;
  height: 2.2rem;
  cursor: pointer;
`;

const PasswordInput = styled.input`
  height: 4.9rem;
  margin: 0.25rem 0 0 0.4rem;
  background: transparent;
  outline: none;
  color: #f9fafb;
  font-size: 1.5rem;
  background-color: #191f28;
  border-radius: 0.6rem;
  padding: 0 1.6rem;
`;
