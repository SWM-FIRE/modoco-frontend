import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useSetSelf from '../hooks/useSetSelf';
// import UserStore from '../stores/userStore';
import ModalStore from '../stores/createRoomModalStore';
import RoomCards from '../components/main/RoomCards';
import Header from '../components/main/Header';
import MainTitle from '../components/main/MainTitle';
import LoginModal from '../components/login/LoginModal';
import CreateRoomModal from '../components/main/CreateRoomModal/CreateRoomModal';
import CreateRoomForm from '../components/main/CreateRoomModal/CreateRoomForm';
import LoginModalStore from '../stores/loginModalStore';

export default function Main() {
  const { isOpenCreateRoomModal } = ModalStore();
  const { isOpenLoginModal } = LoginModalStore();
  // const { nickname } = UserStore();
  const navigate = useNavigate();

  useSetSelf();
  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/');
    }
  });

  return (
    <>
      <Container>
        <Header />
        <MainTitle />
        <RoomCards />
      </Container>
      {isOpenLoginModal && <LoginModal />}
      {isOpenCreateRoomModal && (
        <CreateRoomModal>
          <CreateRoomForm />
        </CreateRoomModal>
      )}
    </>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18181b;
`;
