import styled from 'styled-components';

export default function VoidScreen() {
  return (
    <Container>
      <ControlBar>
        <AvatarPosition />
      </ControlBar>
    </Container>
  );
}

const ControlBar = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarPosition = styled.div`
  bottom: calc(-5% - 3rem);
  height: calc(10% + 6rem);
  width: calc(5% + 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: gray;
  position: absolute;
`;

const Container = styled.div`
  background-color: #4a4a4a;
  display: flex;
  justify-content: center;
  width: 48%;
  height: 0;
  border-radius: 1rem;
  padding-bottom: 28%;
  position: relative;
`;
