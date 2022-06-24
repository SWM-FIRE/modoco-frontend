import styled from 'styled-components';
import InputID from '../components/login/InputID';

export default function MainPage() {
  return (
    <Container>
      <MDC>MODOCO</MDC>
      <Sub>모여서 도란도란 코딩</Sub>
      <InputID />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(113deg, #d8b9ff 0%, #a5ffb9 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const MDC = styled.p`
  margin-top: 5rem;
  height: 8rem;
  font-size: 10rem;
`;

const Sub = styled.p`
  margin-left: -10rem;
  height: 4rem;
  font-size: 4rem;
`;
