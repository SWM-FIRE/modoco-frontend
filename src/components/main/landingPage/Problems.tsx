import styled from 'styled-components';
import media from 'src/styles/media';
import { ReactComponent as WantToBuildTeamImage } from '../../../assets/svg/WantToBuildTeam.svg';
import ProblemWords from './ProblemWords';

export default function Problems() {
  return (
    <Container data-cy="landing-problems">
      <ProblemTitle>
        기존 모각코의
        <br /> 문제점을 해결해요
      </ProblemTitle>
      <ProblemsContainer>
        <ProblemWords />
        <ImageContainer>
          <WantToBuildTeamImage />
        </ImageContainer>
      </ProblemsContainer>
    </Container>
  );
}

const ImageContainer = styled.div`
  ${media.xlarge} {
    margin-top: 2rem;
    margin-left: 20%;
  }
  ${media.small} {
    display: none;
  }
`;

const ProblemsContainer = styled.div`
  display: flex;
  gap: 8.3rem;
  margin-top: 6rem;
  ${media.xlarge} {
    flex-direction: column;
    gap: 0rem;
  }
`;

const ProblemTitle = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-weight: 600;
  font-size: 5.2rem;
  ${media.small} {
    font-size: 3.2rem;
  }
`;

const Container = styled.div`
  margin-top: 30rem;
  margin-left: 15%;
  color: #fcfcf9;
  ${media.xlarge} {
    margin-top: 13rem;
  }
  ${media.small} {
    margin-top: 0;
    margin-left: 10%;
  }
`;
