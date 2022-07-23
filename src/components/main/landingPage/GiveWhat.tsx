import styled from 'styled-components';
import PositiveCircle from './PositiveCircle';

export default function GiveWhat() {
  return (
    <Container>
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
  margin-left: 5%;
`;

const MainTitle = styled.div`
  left: 50%;
  position: absolute;
  font-family: IBMPlexSansKRRegular;
  font-weight: 600;
  font-size: 5.2rem;
  color: #fcfcf9;
  z-index: 1;
`;
