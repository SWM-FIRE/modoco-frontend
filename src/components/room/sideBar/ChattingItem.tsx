import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import MyAvatar from '../../../assets/avatar/MyAvatar';
import userStore from '../../../stores/userStore';

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
  const isMe = user.uid === uid;
  const entrance = type === 'join' || type === 'leave';
  const msgRef = useRef(null);

  const onCheckUrl = (message: string) => {
    const urlReg =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
    const text1 = message.replace(
      urlReg,
      "<a href='$1' target='_blank'>$1</a>",
    );
    const exp2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
    return text1.replace(exp2, '$1<a href="http://$2" target="_blank">$2</a>');
  };

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.innerHTML = onCheckUrl(msg);
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
              <MyAvatar num={Number(user.avatar)} />
            </AvatarComponent>
          )}
          <MessageComponent isMe={isMe}>
            {!isHideNicknameAndAvatar && (
              <Nickname isMe={isMe}>
                {isMe ? '나' : `${user.nickname}`}
              </Nickname>
            )}
            <MessageBox isMe={isMe}>
              <Message isLobby={isLobby} isMe={isMe} ref={msgRef} />
              {!isHideTime && <Time>{moment(time).format('LT')}</Time>}
            </MessageBox>
          </MessageComponent>
        </Component>
      )}
    </div>
  );
}

interface userInterface {
  isMe: boolean;
}

interface hideInterface {
  isHide: boolean;
}

interface componentInterface {
  isMe: boolean;
  isHide: boolean;
}

const EntranceComponent = styled.div<userInterface>`
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

const Component = styled.li<componentInterface>`
  display: flex;
  flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
  gap: 1.6rem;
  margin-top: ${({ isHide }) => (isHide ? '1rem' : '2rem')};
`;

const AvatarComponent = styled.div<hideInterface>`
  margin-left: ${({ isHide }) => (isHide ? '4.8rem' : '0')};
  svg {
    display: ${({ isHide }) => (isHide ? 'none' : 'block')};
    width: 4.8rem;
    height: 4.8rem;
  }
`;

const MessageComponent = styled.div<userInterface>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
`;

const Nickname = styled.div<userInterface>``;

const MessageBox = styled.div<userInterface>`
  display: flex;
  flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
  align-items: flex-end;
  margin-top: 0.4rem;
  width: 100%;
  gap: 0.3rem;
  word-break: break-all;
`;

const Message = styled.div<{ isMe: boolean; isLobby: boolean }>`
  color: rgb(255, 255, 255);
  font-size: 1.5rem;
  padding: 1.6rem;
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
