import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as MessageSend } from '../../../assets/svg/MessageSend.svg';
import roomSocket from '../../../adapters/roomSocket';
import lobbySocket from '../../../adapters/lobbySocket';

export default function SendChat({
  roomId,
  uid,
}: {
  roomId: string;
  uid: number;
}) {
  const [newMessage, setNewMessage] = useState('');
  const newSocket = roomId === 'lobby' ? lobbySocket.socket : roomSocket.socket;
  const inputRef = useRef(null);

  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setNewMessage(() => event.target.value);
    autoGrow();
  };

  const autoGrow = () => {
    if (inputRef.current) {
      inputRef.current.style.height = '2rem';
      inputRef.current.style.height = inputRef.current.scrollHeight
        .toString()
        .concat('px');
    }
  };

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement> | KeyboardEvent,
  ) => {
    event.preventDefault();
    // console.log('new 메세지 : ', newMessage);
    if (newMessage.trim() === '') return;
    newSocket.emit('chatMessage', {
      room: roomId,
      sender: uid,
      message: newMessage,
      createdAt: new Date(),
    });
    setNewMessage('');
    if (inputRef.current) {
      inputRef.current.style.height = '2rem';
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit(event);
    }
  };

  return (
    <SubmitMessage onSubmit={onSubmit} roomId={roomId}>
      <Input
        placeholder="Write your message...."
        value={newMessage}
        roomId={roomId}
        ref={inputRef}
        rows={1}
        onChange={onMessageChange}
        onKeyDown={onKeyDown}
      />
      <Button>
        <MessageSend />
      </Button>
    </SubmitMessage>
  );
}

const SubmitMessage = styled.form<{ roomId: string }>`
  width: 100%;
  max-height: 19rem;
  margin-top: 3rem;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  background-color: ${(props) =>
    props.roomId !== 'lobby' ? ({ theme }) => theme.input : '#313540'};
  z-index: 999;
`;

const Input = styled.textarea<{ roomId: string }>`
  width: calc(100% - 2.7rem);
  font-size: 1.3rem;
  background-color: ${(props) =>
    props.roomId !== 'lobby' ? ({ theme }) => theme.input : '#313540'};
  font-family: IBMPlexSansKRRegular;
  color: rgba(255, 255, 255, 1);
  min-height: 2rem;
  max-height: 13rem;
  ::-webkit-scrollbar {
    width: 0.3rem;
  }

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  cursor: pointer;
  float: right;
  svg {
    width: 2rem;
    height: 2rem;
  }
`;
