import styled from 'styled-components';
import InputNickname from '../components/login/InputNickname';

export default function MainPage() {
  return (
    <Container>
      <Title>MODOCO</Title>
      <Sub>모여서 도란도란 코딩해요</Sub>
      <InputNickname />
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

const Title = styled.p`
  margin-top: 5rem;
  height: 10rem;
  font-size: 10rem;
  font-family: GmarketSansTTFLight, sans-serif, Arial;
`;

const Sub = styled.p`
  margin-left: -10rem;
  height: 4rem;
  font-size: 4rem;
  font-family: GmarketSansTTFBold;
`;
