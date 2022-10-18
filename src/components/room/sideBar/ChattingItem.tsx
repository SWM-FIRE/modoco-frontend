import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import MyAvatar from '../../../assets/avatar/MyAvatar';
import userStore from '../../../stores/userStore';
import CodeItem from './CodeItem';

interface User {
  nickname: string;
  avatar: number;
  uid: number;
}

export default function ChattingItem({
  user,
  msg,
  time,
  type,
  isHideTime,
  isHideNicknameAndAvatar,
  isLobby,
}: {
  user: User;
  msg: string;
  time: string;
  type: string;
  isHideTime: boolean;
  isHideNicknameAndAvatar: boolean;
  isLobby: boolean;
}) {
  const { uid } = userStore();
  const isMe = user?.uid === uid;
  const entrance = type === 'JOIN' || type === 'LEAVE';
  const isCode = type === 'CODE';
  const msgRef = useRef(null);

  const onCheckUrl = (message: string, loc: string) => {
    const urlReg =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
    if (loc === 'url') return message.split(urlReg)[1];
    if (loc === 'front') return message.split(urlReg)[0];
    if (loc === 'back') return message.split(urlReg)[3];
    return null;
  };

  useEffect(() => {
    if (msgRef.current) {
      const url = onCheckUrl(msg, 'url');
      if (url) {
        const front = onCheckUrl(msg, 'front');
        const back = onCheckUrl(msg, 'back');
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.innerText = url;
        msgRef.current.innerHTML = `${front}${a.outerHTML}${back}`;
      } else {
        msgRef.current.innerText = msg;
      }
    }
  }, []);
  return (
    <div>
      {entrance ? (
        <EntranceComponent isMe={isMe}>
          <Entrance>{msg}</Entrance>
        </EntranceComponent>
      ) : (
        <Component isMe={isMe} isHide={isHideNicknameAndAvatar}>
          {!isMe && (
            <AvatarComponent isHide={isHideNicknameAndAvatar}>
              <MyAvatar num={Number(user?.avatar)} />
            </AvatarComponent>
          )}
          <MessageComponent isMe={isMe}>
            {!isHideNicknameAndAvatar && (
              <Nickname>{isMe ? '나' : `${user.nickname}`}</Nickname>
            )}
            <MessageBox isMe={isMe}>
              {isCode ? (
                <CodeItem code={msg} isMe={isMe} isLobby={isLobby} />
              ) : (
                <Message isLobby={isLobby} isMe={isMe} ref={msgRef} />
              )}
              {!isHideTime && <Time>{moment(time).format('LT')}</Time>}
            </MessageBox>
          </MessageComponent>
        </Component>
      )}
    </div>
  );
}

const EntranceComponent = styled.div<{ isMe: boolean }>`
  display: ${({ isMe }) => (isMe ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  margin-top: 2.4rem;
`;

const Entrance = styled.div`
  border: 1px solid rgb(53, 55, 65);
  border-radius: 2rem;
  padding: 0.7rem;
  background-color: rgb(53, 55, 65);
  color: #bbbaba;
`;

const Component = styled.li<{ isMe: boolean; isHide: boolean }>`
  display: flex;
  flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
  gap: 1rem;
  margin-top: ${({ isHide }) => (isHide ? '1rem' : '2rem')};
`;

const AvatarComponent = styled.div<{ isHide: boolean }>`
  width: 4rem;
  height: 4rem;
  svg {
    display: ${({ isHide }) => (isHide ? 'none' : 'block')};
    width: 100%;
    height: 100%;
  }
`;

const MessageComponent = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
`;

const Nickname = styled.div``;

const MessageBox = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
  align-items: flex-end;
  margin-top: 0.2rem;
  width: 100%;
  gap: 0.2rem;
  word-break: break-all;
`;

const Message = styled.div<{ isMe: boolean; isLobby: boolean }>`
  color: rgb(255, 255, 255);
  font-size: 1.5rem;
  padding: 1rem;
  max-width: ${({ isLobby }) => (isLobby ? '100%' : '32rem')};
  border-radius: ${({ isMe }) =>
    isMe ? '0.8rem 0 0.8rem 0.8rem' : '0 0.8rem 0.8rem 0.8rem'};
  background-color: ${({ isMe, theme }) =>
    isMe ? theme.myChat : theme.otherChat};
  a {
    color: #2992e3;
  }
`;

const Time = styled.div`
  font-size: 0.8rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
`;
