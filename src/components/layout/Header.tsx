import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import UserStore from '../../stores/userStore';
import Profile from './Profile';
import HeaderProfileModal from '../HeaderProfile/HeaderProfileModal';
import useSetSelf from '../../hooks/useSetSelf';

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
        <Logo onClick={clickLogo}>modoco</Logo>
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
`;

const Screen = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const Logo = styled.h1`
  cursor: pointer;
  font-size: 3.2rem;
  font-family: IBMPlexSansKRRegular, Arial;
  color: white;
  font-weight: 700;
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
  background-color: #18181b;
`;
