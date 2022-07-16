import styled from 'styled-components';
import { ReactComponent as Positive } from '../../../assets/svg/PositiveCircle.svg';
import { ReactComponent as PositivePerson } from '../../../assets/svg/PositivePerson.svg';

export default function GiveWhat() {
  return (
    <Container>
      <MainTitle>
        개발자에게
        <br /> 친화적인 환경 제공
      </MainTitle>
      <Circle>
        <Positive />
        <Circle1>
          <Title>개발자 네트워킹</Title>
          <SubTitle>
            개발자들의 자유로운 소통이 가능한
            <br /> 창구를 제공
          </SubTitle>
        </Circle1>
        <Circle2>
          <Title>개발자 친화적 요소</Title>
          <SubTitle>
            페어프로그래밍, 코드공유, 통계, QnA등
            <br />
            개발자에게 친화적인 기능
          </SubTitle>
        </Circle2>
        <Circle3>
          <Title>화면공유 기반의 환경</Title>
          <SubTitle>
            화면공유 기반의 환경으로
            <br /> 편하게 작업상황 공유가 가능
          </SubTitle>
        </Circle3>
        <PersonPosition>
          <PositivePerson />
        </PersonPosition>
      </Circle>
    </Container>
  );
}

const SubTitle = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-weight: 400;
  font-size: 1.4rem;
  color: #8796be;
  text-align: center;
  line-height: 2.7rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-family: IBMPlexSansKRRegular;
  font-weight: 600;
  color: #fcfcf9;
`;

const Circle1 = styled.div`
  position: absolute;
  gap: 0.8rem;
  top: 10rem;
  left: 39rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  width: 24rem;
  height: 24rem;
  background-color: #3a3a3a;
`;

const Circle2 = styled.div`
  position: absolute;
  gap: 0.8rem;
  top: 35rem;
  left: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  width: 24rem;
  height: 24rem;
  background-color: #3a3a3a;
`;

const Circle3 = styled.div`
  position: absolute;
  gap: 0.8rem;
  top: 35rem;
  left: 70rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  width: 24rem;
  height: 24rem;
  background-color: #3a3a3a;
`;

const PersonPosition = styled.div`
  position: absolute;
  top: 30rem;
  left: 35rem;
`;

const Circle = styled.div`
  position: relative;
`;

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
`;
