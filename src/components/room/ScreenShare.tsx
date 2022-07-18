import styled from 'styled-components';
import MyAvatar from '../../assets/avatar/MyAvatar';

export default function ScreenShare() {
  return (
    <Container>
      <ScreenWrapper>
        <Screen>
          <AvatarPosition>
            <MyAvatar num={1} />
          </AvatarPosition>
        </Screen>
        <Screen>
          <AvatarPosition>
            <MyAvatar num={5} />
          </AvatarPosition>
        </Screen>
        <Screen>
          <AvatarPosition>
            <MyAvatar num={10} />
          </AvatarPosition>
        </Screen>
        <Screen>
          <AvatarPosition>
            <MyAvatar num={15} />
          </AvatarPosition>
        </Screen>
      </ScreenWrapper>
    </Container>
  );
}

const AvatarPosition = styled.div`
  bottom: -8%;
  width: 20%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 100%;
  }
  position: absolute;
`;

const Screen = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  @media (max-width: 900px) {
    width: 60%;
    height: 0;
    padding-bottom: 38%;
  }
  @media (max-width: 768px) {
    width: 75%;
    height: 0;
    padding-bottom: 45%;
  }
  width: 45%;
  height: 0;
  padding-bottom: 25%;
  border: 1px solid black;
  position: relative;
`;

const ScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  @media (max-width: 900px) {
    flex-direction: column;
    flex-wrap: unset;
    gap: 5%;
  }
  gap: 0 3%;
  height: 100%;
`;

const Container = styled.div`
  margin: 5.6rem 0 0 2.5rem;
  width: calc(100% - 46.5rem);
  height: calc(100% - 7rem);
  background-color: gray;
`;
