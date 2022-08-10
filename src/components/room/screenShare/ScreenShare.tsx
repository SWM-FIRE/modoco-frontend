import styled from 'styled-components';
import SingleScreen from './SingleScreen';
import LocalScreen from './LocalScreen';
import connectedUsersStore from '../../../stores/connectedUsersStore';
import VoidScreen from './VoidScreen';
import MovingTheme from './MovingTheme';

export default function ScreenShare({ theme }) {
  const { connectedUsers } = connectedUsersStore();

  return (
    <Container>
      <ScreenWrapper>
        <FlexRow>
          <LocalScreen />
          {connectedUsers[0] ? (
            <SingleScreen
              key={connectedUsers[0].uid}
              nickname={connectedUsers[0].nickname}
              avatar={connectedUsers[0].avatar}
              uid={connectedUsers[0].uid}
              stream={connectedUsers[0].stream}
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
              key={connectedUsers[0].uid}
              nickname={connectedUsers[0].nickname}
              avatar={connectedUsers[0].avatar}
              uid={connectedUsers[0].uid}
              stream={connectedUsers[0].stream}
            />
          ) : (
            <VoidScreen />
          )}
          {connectedUsers[2] ? (
            <SingleScreen
              key={connectedUsers[0].uid}
              nickname={connectedUsers[0].nickname}
              avatar={connectedUsers[0].avatar}
              uid={connectedUsers[0].uid}
              stream={connectedUsers[0].stream}
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
  @media (max-width: 900px) {
    width: 90%;
    align-items: center;
    height: 0;
    gap: 1rem;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 110%;
  }
`;

const Theme = styled.div`
  height: 10rem;
  width: 10rem;
  min-height: 10rem;
  @media (max-width: 900px) {
    display: none;
  }
`;

const ScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  width: 100%;
  height: 100%;
  @media (max-width: 900px) {
    gap: 2rem;
  }
`;

const Container = styled.div`
  margin: 3rem 0 0 6rem;
  overflow: auto;
  width: calc(95% - 46.5rem);
  height: calc(100% - 5rem);
`;
