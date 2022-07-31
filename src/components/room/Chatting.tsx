import styled from 'styled-components';
import moment from 'moment';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as MessageSend } from '../../assets/svg/MessageSend.svg';
import ChattingItem from './ChattingItem';
import { emitChatMessage } from '../../adapters/chat/socketio';

export function Chat({ messages }) {
  const [newMessage, setNewMessage] = useState('');
  const { roomId } = useParams();
  const chatWindow = useRef(null);

  useEffect(() => {
    moveScrollToReceiveMessage();
  }, [messages]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessage.trim() === '') return;
    emitChatMessage({
      room: roomId,
      sender: localStorage.getItem('uid'),
      message: newMessage,
      createdAt: moment(new Date()).format('LT'),
    });
    setNewMessage('');
  };

  const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const moveScrollToReceiveMessage = useCallback(() => {
    if (chatWindow.current) {
      chatWindow.current.scrollTo({
        top: chatWindow.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <Component>
      <Title>채팅</Title>
      <ChattingList ref={chatWindow}>
        {messages.map((message, id) => (
          <ChattingItem
            // eslint-disable-next-line react/no-array-index-key
            key={id}
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
      <NewMessage onSubmit={onSubmit}>
        <Input
          placeholder="Write your message...."
          value={newMessage}
          onChange={onMessageChange}
        />
        <Button>
          <MessageSend />
        </Button>
      </NewMessage>
    </Component>
  );
}

export const Chatting = React.memo(Chat);

const Component = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: calc(100% - 17.8rem);
  font-family: IBMPlexSansKRRegular;
  font-size: 1.3rem;
  color: #6b7280;
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

const NewMessage = styled.form`
  width: 100%;
  height: 4.8rem;
  margin-top: 3rem;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  background-color: #1b1b1e;
`;

const Input = styled.input`
  width: calc(100% - 2.7rem);
  height: 100%;
  font-size: 1.3rem;
  background-color: #1b1b1e;
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
