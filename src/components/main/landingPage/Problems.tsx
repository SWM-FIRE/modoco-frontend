import styled from 'styled-components';
import { ReactComponent as WantToBuildTeamImage } from '../../../assets/svg/WantToBuildTeam.svg';
import ProblemWords from './ProblemWords';

export default function Problems() {
  return (
    <Container>
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
  @media screen and (max-width: 1200px) {
    svg {
      display: none;
    }
  }
`;

const ProblemsContainer = styled.div`
  display: flex;
  gap: 8.3rem;
  margin-top: 6rem;
`;

const ProblemTitle = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-weight: 600;
  font-size: 5.2rem;
`;

const Container = styled.div`
  margin-top: 30rem;
  margin-left: 15%;
  color: #fcfcf9;
`;
