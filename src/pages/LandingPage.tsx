import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Scrolls from '../components/main/Scrolls';
import Title from '../components/main/TitleContainer';
import LoginModal from '../components/login/LoginModal';
import { getMe } from '../api/main';
import LandingPage from '../components/main/landingPage/LandingPage';
import mainModalStore from '../stores/mainModalStore';

export default function Landing() {
  const { isOpenLoginModal } = mainModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    getMe().then((res) => {
      if (res.data) {
        navigate('/main');
      }
    });
  }, []);

  return (
    <>
      {isOpenLoginModal && <LoginModal />}
      <Container>
        <Title />
        <Scrolls />
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
