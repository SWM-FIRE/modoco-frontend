import { useEffect } from 'react';
import styled from 'styled-components';
import Rooms from '../components/lobby/Room';
import UserStore from '../stores/userstore';

export default function Lobby() {
  const { nickname, uid } = UserStore();
  useEffect(() => {
    console.log(nickname, uid);
  }, []);

  return (
    <Container>
      <Header>Lobby</Header>
      <Nickname>{nickname}</Nickname>
      <Rooms />
    </Container>
  );
}

const Nickname = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  width: 5rem;
  height: 3rem;
`;

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
