import React, { useState } from 'react';
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
  const newSocket = roomId ? roomSocket.socket : lobbySocket.socket;

  const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessage.trim() === '') return;
    newSocket.emit('chatMessage', {
      room: roomId,
      sender: uid,
      message: newMessage,
      createdAt: new Date(),
    });

    setNewMessage('');
  };

  return (
    <SubmitMessage onSubmit={onSubmit} roomId={roomId}>
      <Input
        placeholder="Write your message...."
        value={newMessage}
        onChange={onMessageChange}
        roomId={roomId}
      />
      <Button>
        <MessageSend />
      </Button>
    </SubmitMessage>
  );
}

const SubmitMessage = styled.form<{ roomId: string }>`
  width: 100%;
  height: 4.8rem;
  margin-top: 3rem;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  background-color: ${(props) =>
    props.roomId ? ({ theme }) => theme.input : '#313540'};
  z-index: 999;
`;

const Input = styled.input<{ roomId: string }>`
  width: calc(100% - 2.7rem);
  height: 100%;
  font-size: 1.3rem;
  background-color: ${(props) =>
    props.roomId ? ({ theme }) => theme.input : '#313540'};
  font-family: IBMPlexSansKRRegular;
  color: rgba(255, 255, 255, 1);

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
