import styled from 'styled-components';
import { useEffect } from 'react';
import SingleParticipant from './SingleParticipant';
import connectedUsersStore from '../../../stores/connectedUsersStore';
import findStream from '../findStream';
import UserStore from '../../../stores/userStore';
import userMediaStreamStore from '../../../stores/userMediaStreamStore';

export default function Participants() {
  const { connectedUsers, userStream } = connectedUsersStore((state) => state);
  const { userMediaStream } = userMediaStreamStore((state) => state);
  const { nickname, avatar } = UserStore((state) => state);
  useEffect(() => {
    console.log('connectedUsers', connectedUsers);
  }, []);
  return (
    <Component>
      <Title>참여자 목록</Title>
      <UserList>
        <SingleParticipant
          isMe
          nickname={nickname}
          avatar={avatar.toString()}
          stream={userMediaStream}
        />
        {connectedUsers.map((user) => (
          <SingleParticipant
            key={user.uid}
            isMe={false}
            nickname={user.nickname}
            avatar={user.avatar}
            stream={findStream({
              sid: user.socketId,
              connectedUsers,
              userStream,
            })}
          />
        ))}
      </UserList>
    </Component>
  );
}

const Component = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-size: 1.3rem;
  border-bottom: 1px solid rgba(55, 65, 81, 1);
  padding-bottom: 2.2rem;
  color: #9ca3af;
  max-height: 12.8rem;
  /* flex-shrink: 1; */
`;

const Title = styled.div``;

const UserList = styled.div`
  margin-top: 0.8rem;
  margin-right: 1.9rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 3.3rem;
`;
