import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Scrolls from '../components/main/Scrolls';
import Header from '../components/main/Header';
import Title from '../components/main/TitleContainer';
import LoginModal from '../components/login/LoginModal';
import useSetSelf from '../hooks/useSetSelf';
import LandingPage from '../components/main/landingPage/LandingPage';
import LoginModalStore from '../stores/loginModalStore';

export default function Landing() {
  const { isOpenLoginModal } = LoginModalStore();
  const navigate = useNavigate();
  useSetSelf();
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/main');
    }
  });

  return (
    <>
      <Container>
        <Header />
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
