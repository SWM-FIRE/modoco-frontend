import styled from 'styled-components';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as MessageSend } from '../../../assets/svg/MessageSend.svg';
import ChattingItem from './ChattingItem';
import messageStore from '../../../stores/room/messagesStore';
import roomSocket from '../../../adapters/roomSocket';
import userStore from '../../../stores/userStore';
import receiveNewMessageStore from '../../../stores/room/receiveNewMessageStore';
import NewMessage from './NewMessage';

export default function Chat() {
  const [newMessage, setNewMessage] = useState('');
  const { setIsReceiveNewMessage } = receiveNewMessageStore((state) => state);
  const { roomId } = useParams();
  const chatWindow = useRef(null);
  const { messages } = messageStore((state) => state);
  const { uid } = userStore((state) => state);
  const newSocket = roomSocket.socket;

  useEffect(() => {
    moveScrollToReceiveMessage('auto', true);
    setIsReceiveNewMessage(false);
  }, []);

  useEffect(() => {
    if (messages[messages.length - 1]?.uid === uid)
      moveScrollToReceiveMessage('smooth', true);
    else moveScrollToReceiveMessage('smooth', false);
    setIsReceiveNewMessage(false);
  }, [messages]);

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent,
  ) => {
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

  const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewMessage(() => event.target.value);
  };

  const moveScrollToReceiveMessage = useCallback(
    (behavior: string, isFirstView: boolean) => {
      if (chatWindow.current) {
        const isScroll =
          chatWindow.current.scrollHeight - chatWindow.current.scrollTop <=
            chatWindow.current.clientHeight + 100 || isFirstView;
        if (isScroll) {
          chatWindow.current.scrollTo({
            top: chatWindow.current.scrollHeight,
            behavior,
          });
        }
      }
    },
    [],
  );

  return (
    <Component>
      <Title>채팅</Title>
      <ChattingList ref={chatWindow}>
        {messages.map((message) => (
          <ChattingItem
            key={message.uid + message.createdAt}
            user={{
              nickname: message.nickname,
              avatar: message.avatar,
              uid: message.uid,
            }}
            msg={message.message}
            time={message.createdAt}
            type={message.type}
            isHideTime={message.isHideTime}
            isHideNicknameAndAvatar={message.isHideNicknameAndAvatar}
          />
        ))}
      </ChattingList>
      <NewMessage chatWindow={chatWindow} />
      <SubmitMessage onSubmit={onSubmit}>
        <Input
          value={newMessage}
          placeholder="Write your message..."
          onChange={onMessageChange}
        />
        <Button>
          <MessageSend />
        </Button>
      </SubmitMessage>
    </Component>
  );
}

export const Chatting = React.memo(Chat);

const Component = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: calc(100% - 17.8rem);
  font-family: IBMPlexSansKRRegular;
  font-size: 1.3rem;
  color: #9ca3af;
`;

const Title = styled.div`
  margin-top: 2.4rem;
`;

const ChattingList = styled.ul`
  flex-grow: 1;
  width: 100%;
  overflow: auto;
  height: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SubmitMessage = styled.form`
  width: 100%;
  max-height: 19rem;
  margin-top: 3rem;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  background-color: ${({ theme }) => theme.input};
  z-index: 999;
`;

const Input = styled.input`
  width: calc(100% - 2.7rem);
  font-size: 1.3rem;
  background-color: ${({ theme }) => theme.input};
  font-family: IBMPlexSansKRRegular;
  color: rgba(255, 255, 255, 1);
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
