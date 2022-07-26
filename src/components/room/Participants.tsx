import styled from 'styled-components';
import SingleParticipant from './SingleParticipant';
import connectedUsersStore from '../../stores/connectedUsersStore';

export default function Participants() {
  const { connectedUsers } = connectedUsersStore();
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
            key={user.nickname}
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
  color: #6b7280;
`;

const Title = styled.div``;

const UserList = styled.div`
  margin-top: 2.4rem;
  margin-right: 1.9rem;
  display: flex;
  justify-content: flex-start;
  gap: 2.4rem;
`;