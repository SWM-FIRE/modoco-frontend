import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RoomBlocks from '../components/lobby/RoomBlocks';
import UserStore from '../stores/userStore';

export default function Lobby() {
  const navigate = useNavigate();
  const { nickname, setNickname, setUid } = UserStore();
  useEffect(() => {
    console.log('왜? ', localStorage.getItem('uid'));
    if (!localStorage.getItem('uid') || !localStorage.getItem('nickname')) {
      navigate('/');
    } else {
      setNickname(localStorage.getItem('nickname'));
      setUid(localStorage.getItem('uid'));
    }
  }, []);
  return (
    <Container>
      <Header>Lobby</Header>
      <Nickname>{nickname}</Nickname>
      <RoomBlocks />
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
  background: linear-gradient(113deg, #9f9f9f 0%, #636363 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
