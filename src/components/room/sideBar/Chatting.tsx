import styled from 'styled-components';
import React, { useCallback, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChattingItem from './ChattingItem';
import messageStore from '../../../stores/room/messagesStore';
import userStore from '../../../stores/userStore';
import receiveNewMessageStore from '../../../stores/room/receiveNewMessageStore';
import SendChat from '../../atoms/chatting/SendChat';
import NewMessage from './NewMessage';

export default function Chat() {
  const { setIsReceiveNewMessage } = receiveNewMessageStore();
  const { roomId } = useParams();
  const chatWindow = useRef(null);
  const { messages } = messageStore();
  const { uid } = userStore();

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
            key={message.uid + message.createdAt + message.type}
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
            isLobby={false}
          />
        ))}
      </ChattingList>
      <NewMessage chatWindow={chatWindow} />
      <SendChat roomId={roomId} uid={uid} />
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
