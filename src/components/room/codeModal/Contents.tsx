import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import roomSocket from '../../../adapters/roomSocket';
import userStore from '../../../stores/userStore';
import codeChatStore from '../../../stores/room/codeChatStore';
import Code from './Code';
import Input from './Input';

export default function Contents({
  toggle,
  codeModalType,
}: {
  toggle: (_type) => void;
  codeModalType: string;
}) {
  const { code } = codeChatStore();
  const { roomId } = useParams();
  const { uid } = userStore();
  const newSocket = roomSocket.socket;
  const [isInput, setIsInput] = useState(true && codeModalType === 'SEND');

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (code.trim() === '') return;
    newSocket.emit('chatMessage', {
      room: roomId,
      type: 'CODE',
      from: uid,
      message: code,
      createdAt: new Date(),
    });
    toggle(codeModalType);
  };

  return (
    <Component>
      {codeModalType === 'SEND' && (
        <TypeComponent>
          <Type
            type="button"
            onClick={() => setIsInput(true)}
            isClick={isInput}
          >
            입력
          </Type>
          <Type
            type="button"
            onClick={() => setIsInput(false)}
            isClick={!isInput}
          >
            코드
          </Type>
        </TypeComponent>
      )}
      {isInput ? <Input /> : <Code codeModalType={codeModalType} />}
      {codeModalType === 'SEND' && (
        <Button onClick={onSubmit}>코드 보내기</Button>
      )}
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 5rem;
`;

const Button = styled.button`
  width: 100%;
  height: 5rem;
  background-color: #4c4c4c;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  margin-top: 3rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #3c3c3c;
  }
`;

const TypeComponent = styled.div``;

const Type = styled.button<{ isClick: boolean }>`
  color: ${(props) => (props.isClick ? 'white' : 'gray')};
  font-size: 2rem;
  cursor: pointer;
  :first-child {
    margin-right: 1rem;
  }
`;
