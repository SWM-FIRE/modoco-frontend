import styled from 'styled-components';
import media from 'src/styles/media';
import PositiveCircle from './PositiveCircle';

export default function GiveWhat() {
  return (
    <Container data-cy="landing-giveWhat">
      <MainTitle>
        개발자에게
        <br /> 친화적인 환경 제공
      </MainTitle>
      <ImgContainer>
        <PositiveCircle />
      </ImgContainer>
    </Container>
  );
}

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  overflow: hidden;
`;

const Container = styled.div`
  position: relative;
  margin-top: 20rem;
  ${media.xlarge} {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 0%;
  }
  ${media.small} {
    display: none;
  }
  margin-left: 5%;
`;

const MainTitle = styled.div`
  left: 10%;
  position: absolute;
  ${media.xlarge} {
    position: relative;
    text-align: right;
    margin-right: -20%;
    margin-bottom: -5rem;
  }
  font-family: IBMPlexSansKRRegular;
  font-weight: 600;
  font-size: 5.2rem;
  color: #fcfcf9;
  z-index: 1;
`;
