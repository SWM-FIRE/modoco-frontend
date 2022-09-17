import styled from 'styled-components';
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
  @media (max-width: 1440px) {
    margin-left: 30%;
  }
`;

const ProblemsContainer = styled.div`
  display: flex;
  gap: 8.3rem;
  margin-top: 6rem;
  @media (max-width: 1440px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const ProblemTitle = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-weight: 600;
  font-size: 5.2rem;
`;

const Container = styled.div`
  margin-top: 30rem;
  @media (max-width: 1440px) {
    margin-top: 13rem;
  }
  margin-left: 15%;
  color: #fcfcf9;
`;
