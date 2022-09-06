import styled from 'styled-components';
import SingleScreen from './SingleScreen';
import connectedUsersStore from '../../../stores/room/connectedUsersStore';
import VoidScreen from './VoidScreen';
import MovingTheme from './MovingTheme';
import findStream from '../findStream';
import userStore from '../../../stores/userStore';
import userMediaStreamStore from '../../../stores/room/userMediaStreamStore';

export default function ScreenShare({ theme }) {
  const { connectedUsers, userStream } = connectedUsersStore();
  const { nickname, avatar, uid } = userStore();
  const { userMediaStream } = userMediaStreamStore();

  return (
    <Container>
      <ScreenWrapper>
        <FlexRow>
          <SingleScreen
            connectedUser={{
              nickname,
              uid,
              avatar,
            }}
            stream={userMediaStream}
          />
          {connectedUsers[0] ? (
            <SingleScreen
              key={connectedUsers[0].uid}
              connectedUser={connectedUsers[0]}
              stream={findStream({
                sid: connectedUsers[0].socketId,
                connectedUsers,
                userStream,
              })}
            />
          ) : (
            <VoidScreen />
          )}
        </FlexRow>
        <Theme>
          <MovingTheme theme={theme} size="10rem" />
        </Theme>
        <FlexRow>
          {connectedUsers[1] ? (
            <SingleScreen
              key={connectedUsers[1].uid}
              connectedUser={connectedUsers[1]}
              stream={findStream({
                sid: connectedUsers[1].socketId,
                connectedUsers,
                userStream,
              })}
            />
          ) : (
            <VoidScreen />
          )}
          {connectedUsers[2] ? (
            <SingleScreen
              key={connectedUsers[2].uid}
              connectedUser={connectedUsers[2]}
              stream={findStream({
                sid: connectedUsers[2].socketId,
                connectedUsers,
                userStream,
              })}
            />
          ) : (
            <VoidScreen />
          )}
        </FlexRow>
      </ScreenWrapper>
    </Container>
  );
}

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 0;
  gap: 3rem;
  padding-bottom: 28%;
`;

const Theme = styled.div`
  height: 10rem;
  width: 10rem;
  min-height: 10rem;
`;

const ScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  width: 100%;
  height: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  margin: 3rem 0 0 6rem;
  overflow: auto;
  width: calc(95% - 46.5rem);
  height: calc(100% - 5rem);
  @media (max-width: 1440px) {
    width: calc(95% - 10rem);
  }
`;
