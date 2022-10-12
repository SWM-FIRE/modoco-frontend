import styled from 'styled-components';
import RoomPassword from './RoomPassword';

export default function Private({ isPrivate, roomPassword, onChange }) {
  return (
    <>
      <Component>
        <Type>공개 여부 *</Type>
        <Inputs>
          <Label>
            <Input
              type="radio"
              id="isPrivate"
              name="isPrivate"
              value="false"
              onChange={onChange}
              checked={isPrivate === false}
            />
            공개 코딩방
          </Label>
          <Label>
            <Input
              type="radio"
              id="isPrivate"
              name="isPrivate"
              value="true"
              onChange={onChange}
              data-cy="create-room-modal-private"
            />
            비공개 코딩방
          </Label>
        </Inputs>
      </Component>
      {isPrivate ? (
        <RoomPassword roomPassword={roomPassword} onChange={onChange} />
      ) : null}
    </>
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
  gap: 20rem;
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
