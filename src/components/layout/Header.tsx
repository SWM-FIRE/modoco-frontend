import React, { useEffect } from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import { useNavigate } from 'react-router-dom';
import mainModalStore from 'src/stores/mainModalStore';
import friendSocket, { recvDirectMessage } from 'src/adapters/friendSocket';
import directMessageStore from 'src/stores/directMessageStore';
import UserStore from '../../stores/userStore';
import Profile from './Profile';
import HeaderProfileModal from '../headerProfile/HeaderProfileModal';
import useSetSelf from '../../hooks/useSetSelf';
import ModocoLogo from '../atoms/ModocoLogo';

export default function Header() {
  const { uid, isLogin } = UserStore();
  const navigate = useNavigate();
  const { isOpenProfileModal, closeProfileModal } = mainModalStore();
  const { appendMessage } = directMessageStore();

  useSetSelf();
  useEffect(() => {
    recvDirectMessage(appendMessage, uid);
    return () => {
      friendSocket.socket?.off('directMessage');
    };
  }, [appendMessage, uid, friendSocket.socket]);
  const clickLogo = () => {
    if (localStorage.getItem('access_token')) {
      navigate('/main');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      {isOpenProfileModal && <Screen onClick={closeProfileModal} />}
      <Container>
        <ModocoLogo event={clickLogo} />
        {isLogin ? <Profile /> : <ProfileSkeleton />}
        {isOpenProfileModal && <HeaderProfileModal />}
      </Container>
    </>
  );
}

const ProfileSkeleton = styled.div`
  width: 9.1rem;
  height: 4.8rem;
  border-radius: 3rem;
  background-color: rgba(255, 255, 255, 0.06);
  ${media.small} {
    width: 7.4rem;
    height: 3.8rem;
  }
`;

const Screen = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const Container = styled.div`
  width: 100vw;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid #2b2e41 0.1rem;
  padding: 0 4.4rem;
  position: relative;
  ${media.small} {
    padding: 0 2rem;
    height: 6rem;
  }
`;
