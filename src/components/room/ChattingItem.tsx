import styled from 'styled-components';
import React from 'react';
import MyAvatar from '../../assets/avatar/MyAvatar';
import messageInterface from '../../interface/message.interface';

export default function ChattingItem({ user, msg, time }: messageInterface) {
  const uid = localStorage.getItem('uid');

  return (
    <Component isMe={user.uid === uid}>
      {user.uid !== uid && (
        <AvatarComponent>
          <MyAvatar num={Number(user.avatar)} />
        </AvatarComponent>
      )}
      <MessageComponent isMe={user.uid === uid}>
        <Nickname isMe={user.uid === uid}>
          {user.uid === uid ? '나' : `${user.nickname}`}
        </Nickname>
        <MessageBox isMe={user.uid === uid}>
          <Message>{msg}</Message>
          <Time>{time}</Time>
        </MessageBox>
      </MessageComponent>
    </Component>
  );
}

interface userInterface {
  isMe: boolean;
}

const Component = styled.li<userInterface>`
  display: flex;
  flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
  width: 100%;
  gap: 1.6rem;
  margin-top: 2.4rem;
`;

const AvatarComponent = styled.div`
  svg {
    width: 4.8rem;
    height: 4.8rem;
  }
`;

const MessageComponent = styled.div<userInterface>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
`;

const Nickname = styled.div<userInterface>``;

const MessageBox = styled.div<userInterface>`
  border-radius: ${({ isMe }) =>
    isMe ? '0.8rem 0 0.8rem 0.8rem' : '0 0.8rem 0.8rem 0.8rem'};
  padding: 1.6rem;
  margin-top: 0.4rem;
  background-color: ${({ isMe }) =>
    isMe ? 'rgb(53, 55, 65)' : 'rgb(31, 35, 49)'};
  overflow: hidden;
`;

const Message = styled.div`
  color: rgb(255, 255, 255);
  font-size: 1.5rem;
  width: 100%;
`;

const Time = styled.div`
  font-size: 0.8rem;
  float: right;
  margin-top: 0.2rem;
`;
