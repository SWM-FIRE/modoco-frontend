import styled from 'styled-components';
import { useEffect } from 'react';
import SingleParticipant from './SingleParticipant';
import connectedUsersStore from '../../stores/connectedUsersStore';

export default function Participants() {
  const { connectedUsers } = connectedUsersStore();
  useEffect(() => {
    console.log('connectedUsers', connectedUsers);
  }, []);
  return (
    <Component>
      <Title>참여자 목록</Title>
      <UserList>
        <SingleParticipant
          nickname={localStorage.getItem('nickname')}
          avatar={localStorage.getItem('avatar')}
        />
        {connectedUsers.map((user) => (
          <SingleParticipant
            key={user.uid}
            nickname={user.nickname}
            avatar={user.avatar}
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
`;

const Title = styled.div``;

const UserList = styled.div`
  margin-top: 2.4rem;
  margin-right: 1.9rem;
  display: flex;
  justify-content: flex-start;
  gap: 2.4rem;
`;
