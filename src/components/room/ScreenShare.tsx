import styled from 'styled-components';

export default function ScreenShare() {
  return (
    <Container>
      <ScreenWrapper>
        <Screen />
        <Screen />
        <Screen />
        <Screen />
      </ScreenWrapper>
    </Container>
  );
}

const Screen = styled.div`
  background-color: white;
  @media (max-width: 768px) {
    width: 80%;
    height: 0;
    padding-bottom: 50%;
  }
  width: 45%;
  height: 0;
  padding-bottom: 25%;
  border: 1px solid black;
`;

const ScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  @media (max-width: 768px) {
    flex-direction: column;
    flex-wrap: unset;
  }
  gap: 5%;
  height: 100%;
`;

const Container = styled.div`
  margin: 5.6rem 0 2.5rem 2.5rem;
  width: calc(100% - 46.5rem);
  height: calc(100% - 10rem);
  background-color: gray;
`;
