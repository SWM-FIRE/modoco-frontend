import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Scrolls from '../components/main/Scrolls';
import Title from '../components/main/TitleContainer';
import LoginModal from '../components/login/LoginModal';

import LandingPage from '../components/main/landingPage/LandingPage';
import mainModalStore from '../stores/mainModalStore';

export default function Landing() {
  const { isOpenLoginModal } = mainModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/main');
    }
  });

  return (
    <>
      <Container>
        <Title />
        <Scrolls />
        <LandingPage />
      </Container>
      {isOpenLoginModal && <LoginModal />}
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
