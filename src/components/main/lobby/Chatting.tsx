import styled from 'styled-components';
import React, { useCallback, useRef, useEffect } from 'react';
import ChattingItem from '../../room/sideBar/ChattingItem';
import lobbyMessageStore from '../../../stores/lobbyMessageStore';
import userStore from '../../../stores/userStore';
import SendChat from '../../atoms/chatting/SendChat';

export default function Chat() {
  const chatWindow = useRef(null);
  const { messages } = lobbyMessageStore();
  const { uid } = userStore();

  useEffect(() => {
    moveScrollToReceiveMessage('auto', true);
  }, []);

  useEffect(() => {
    if (messages[messages.length - 1]?.uid === uid)
      moveScrollToReceiveMessage('smooth', true);
    else moveScrollToReceiveMessage('smooth', false);
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
            isLobby
          />
        ))}
      </ChattingList>
      <SendChat roomId="lobby" uid={uid} />
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
  height: 100%;
  font-family: IBMPlexSansKRRegular;
  font-size: 1.3rem;
  color: #9ca3af;
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
