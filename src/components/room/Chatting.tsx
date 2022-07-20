import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as MessageSend } from '../../assets/svg/MessageSend.svg';
import ChattingItem from './ChattingItem';

export default function Chatting({ socket }) {
  const [userList, setUserList] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const chatWindow = useRef(null);

  useEffect(() => {
    socket.on('chatMessage', receiveMessage);
  }, []);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessage === '') return;
    socket.emit('chatMessage', {
      room: roomId,
      sender: localStorage.getItem('uid'),
      message: newMessage,
      createdAt: new Date(),
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

  // const userRequest = async (message) => {
  //   const API_URL: string =
  //     `https://모도코.com/users/${message.sender}` as string;
  //   const { data } = await axios.get(API_URL);
  //   return data;
  // };
  const receiveMessage = useCallback(
    (receiveMsg) => {
      if (!userList[receiveMsg.sender]) {
        try {
          axios
            .get(`https://모도코.com/api/v1/users/${receiveMsg.sender}`)
            .then((res) => {
              // if user is not in userList, add it
              setUserList((users) => {
                return { ...users, [receiveMsg.sender]: res.data };
              });

              setMessages((message) => [
                ...message,
                {
                  uid: receiveMsg.sender,
                  nickname: res.data.nickname,
                  avatar: res.data.avatar,
                  message: receiveMsg.message,
                  creratedAt: receiveMsg.createdAt,
                },
              ]);
            });
        } catch (err) {
          console.log('error!! ', err);
        }
      } else {
        setMessages((message) => [
          ...message,
          {
            uid: receiveMsg.sender,
            nickname: userList[receiveMsg.sender].nickname,
            avatar: userList[receiveMsg.sender].avatar,
            message: receiveMsg.message,
            creratedAt: receiveMsg.createdAt,
          },
        ]);
      }
      // add message to messages
      // setMessages((message) => [...message, receiveMsg]);
      moveScrollToReceiveMessage();
    },
    [moveScrollToReceiveMessage],
  );

  return (
    <Component>
      <Title>채팅</Title>
      <ChattingList ref={chatWindow}>
        {messages.map((message) => (
          <ChattingItem
            key={message.createdAt}
            user={{
              nickname: message.nickname,
              avatar: message.avatar,
              uid: message.uid,
            }}
            msg={message.message}
            time={moment(message.createdAt).format('LT')}
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
  position: relative;
  width: 100%;
  margin-top: 3rem;
`;

const Input = styled.input`
  width: 100%;
  height: 4.8rem;
  font-size: 1.3rem;
  border-radius: 1rem;
  padding: 1.6rem 2rem;
  background-color: #1b1b1e;
  font-family: IBMPlexSansKRRegular;
  color: rgba(255, 255, 255, 1);

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  position: absolute;
  cursor: pointer;
  right: 1.8rem;
  top: 50%;
  transform: translateY(-50%);
`;
