import styled from 'styled-components';
import { ReactComponent as WantToBuildTeam } from '../../../assets/svg/WantToBuildTeam.svg';
import { ReactComponent as Problem1 } from '../../../assets/svg/Problem1.svg';
import { ReactComponent as Problem2 } from '../../../assets/svg/Problem2.svg';
import { ReactComponent as Problem3 } from '../../../assets/svg/Problem3.svg';
import { ReactComponent as Problem4 } from '../../../assets/svg/Problem4.svg';

export default function Problems() {
  return (
    <Container>
      <ProblemTitle>
        기존 모각코의
        <br /> 문제점을 해결해요
      </ProblemTitle>
      <ProblemsContainer>
        <ProblemWords>
          <FlexProblems>
            <Problem>
              <ProblemImg>
                <Problem1 />
              </ProblemImg>
              <ProblemText>모집과 운영을 동시에</ProblemText>
            </Problem>
            <Problem>
              <ProblemImg>
                <Problem3 />
              </ProblemImg>
              <ProblemText>언제 어디서나 참여 가능</ProblemText>
            </Problem>
          </FlexProblems>
          <FlexProblems>
            <Problem>
              <ProblemImg>
                <Problem2 />
              </ProblemImg>
              <ProblemText>몰입할 수 있는 가상의 공간</ProblemText>
            </Problem>
            <Problem>
              <ProblemImg>
                <Problem4 />
              </ProblemImg>
              <ProblemText>개발자 소통 커뮤니티</ProblemText>
            </Problem>
          </FlexProblems>
        </ProblemWords>
        <WantToBuildTeam />
      </ProblemsContainer>
    </Container>
  );
}

const ProblemWords = styled.div`
  display: flex;
  gap: 4.2rem;
  flex-direction: column;
`;

const ProblemText = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-weight: 500;
  font-size: 1.8rem;
`;

const ProblemImg = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  object-fit: contain;
`;

const Problem = styled.div`
  display: flex;
  gap: 1.64rem;
  align-items: center;
  width: 27rem;
`;

const FlexProblems = styled.div`
  display: flex;
  gap: 8.3rem;
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
