import styled from 'styled-components';
import Rooms from '../components/lobby/Room';

export default function Lobby() {
  return (
    <Container>
      <Header>Lobby</Header>
      <Rooms />
    </Container>
  );
}

const Header = styled.div`
  width: 20rem;
  height: 10rem;
  font-size: 10rem;
  text-align: center;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(113deg, #9f9f9f 0%, #636363 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
