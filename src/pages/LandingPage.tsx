import { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Scrolls from '../components/main/Scrolls';
import Title from '../components/main/TitleContainer';
import LoginModal from '../components/login/LoginModal';
import { getMe } from '../api/main';
import LandingPage from '../components/main/landingPage/LandingPage';
import useMainModal from '../hooks/useMainModal';
import loginModalStore from '../stores/loginModalStore';

export default function Landing() {
  const { setRoomPasswordModal } = useMainModal();
  const { isOpenLoginModal, setLoginModal } = loginModalStore();
  const navigate = useNavigate();

  const openLoginModal = useCallback(() => {
    setLoginModal(true);
  }, [setLoginModal]);

  const closeLoginModal = useCallback(() => {
    setLoginModal(false);
  }, [setLoginModal]);

  const openRoomPasswordModal = useCallback(() => {
    setRoomPasswordModal(true);
  }, [setRoomPasswordModal]);

  useEffect(() => {
    getMe().then((res) => {
      if (res.data) {
        navigate('/main');
      }
    });
  }, [navigate]);

  return (
    <>
      {isOpenLoginModal && <LoginModal closeLoginModal={closeLoginModal} />}
      <Container>
        <Title />
        <Scrolls
          openLoginModal={openLoginModal}
          openRoomPasswordModal={openRoomPasswordModal}
        />
        <LandingPage />
      </Container>
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
