import styled from 'styled-components';
import SingleScreen from './SingleScreen';
import LocalScreen from './LocalScreen';
import connectedUsersStore from '../../stores/connectedUsersStore';

export default function ScreenShare() {
  const { connectedUsers } = connectedUsersStore();

  return (
    <Container>
      <ScreenWrapper>
        <LocalScreen
          nickname={localStorage.getItem('nickname')}
          avatar={localStorage.getItem('avatar')}
          uid={localStorage.getItem('uid')}
        />
        {connectedUsers.map((user) => (
          <SingleScreen
            key={user.uid}
            nickname={user.nickname}
            avatar={user.avatar}
            uid={user.uid}
            stream={user.stream}
          />
        ))}
      </ScreenWrapper>
    </Container>
  );
}

const ScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  @media (max-width: 900px) {
    flex-direction: column;
    flex-wrap: unset;
    gap: 10%;
  }
  gap: 0 8%;
  height: 100%;
`;

const Container = styled.div`
  margin: 3rem 0 0 1.6rem;
  width: calc(100% - 46.5rem);
  height: calc(100% - 5rem);
`;
