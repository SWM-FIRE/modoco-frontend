import React, { useState } from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import { useNavigate } from 'react-router-dom';
import UserStore from '../../stores/userStore';
import Profile from './Profile';
import HeaderProfileModal from '../HeaderProfile/HeaderProfileModal';
import useSetSelf from '../../hooks/useSetSelf';
import ModocoLogo from '../atoms/ModocoLogo';

export default function Header() {
  const { isLogin } = UserStore();
  const [headerProfileModal, toggleHeaderProfileModal] =
    useState<boolean>(false);
  const navigate = useNavigate();

  useSetSelf();
  const clickLogo = () => {
    if (localStorage.getItem('access_token')) {
      navigate('/main');
    } else {
      navigate('/');
    }
  };

  const toggleModal = () => {
    toggleHeaderProfileModal(!headerProfileModal);
  };

  return (
    <>
      {headerProfileModal && <Screen onClick={toggleModal} />}
      <Container>
        <ModocoLogo event={clickLogo} />
        {isLogin ? (
          <Profile
            toggleModal={toggleModal}
            headerProfile={headerProfileModal}
          />
        ) : (
          <ProfileSkeleton />
        )}
        {headerProfileModal && <HeaderProfileModal toggleModal={toggleModal} />}
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
