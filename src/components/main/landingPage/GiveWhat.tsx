import styled from 'styled-components';
import PositiveCircle from './PositiveCircle';

export default function GiveWhat() {
  return (
    <Container data-cy="landing-giveWhat">
      <MainTitle>
        개발자에게
        <br /> 친화적인 환경 제공
      </MainTitle>
      <PositiveCircle />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  margin-top: 20rem;
  @media (max-width: 1440px) {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 0%;
  }
  margin-left: 5%;
`;

const MainTitle = styled.div`
  left: 50%;
  position: absolute;
  @media (max-width: 1440px) {
    position: relative;
    left: 0;
    margin-bottom: -5rem;
  }
  font-family: IBMPlexSansKRRegular;
  font-weight: 600;
  font-size: 5.2rem;
  color: #fcfcf9;
  z-index: 1;
`;
