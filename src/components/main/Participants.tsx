import styled from 'styled-components';
import connectedLobbyUsers from '../../stores/connectedLobbyUsers';
import MyAvatar from '../../assets/avatar/MyAvatar';

export default function Participants() {
  const { connectedUsers } = connectedLobbyUsers();
  return (
    <Container>
      {connectedUsers.map((user) => {
        return (
          <User key={user.uid}>
            <AvatarContainer>
              <MyAvatar num={user.avatar} />
            </AvatarContainer>
            <Nickname>{user.nickname}</Nickname>
          </User>
        );
      })}
    </Container>
  );
}

const AvatarContainer = styled.div`
  width: 4rem;
  height: 4rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 10px;
`;

const Nickname = styled.div`
  font-size: 1.3rem;
  color: #9ca3af;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 6rem);
  overflow: auto;
  margin-top: 1rem;
`;
