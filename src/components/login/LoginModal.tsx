import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import media from 'src/styles/media';
import Auths from './Auths';
import { ReactComponent as X } from '../../assets/svg/X.svg';
import ModalTitle from './ModalTitle';
import UserInput from './UserInput';

export default function LoginModal({ closeLoginModal }) {
  return (
    <ModalBackground onClick={closeLoginModal} data-cy="main-login-outer">
      <ModalBox
        onClick={(e) => e.stopPropagation()}
        data-cy="main-login-container"
      >
        <Close onClick={closeLoginModal} data-cy="main-login-close">
          <X />
        </Close>
        <ModalTitle />
        <UserInput />
        <SignUp onClick={closeLoginModal}>
          <Link to="/signUp" data-cy="main-move-to-register">
            아직 회원이 아니신가요?
          </Link>
        </SignUp>
        <Auths />
      </ModalBox>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  top: 0;
  display: flex;
  z-index: 999;
`;

const ModalBox = styled.div`
  position: fixed;
  background-color: #23262f;
  border-radius: 1rem;
  width: 61rem;
  padding: 6.8rem 10.2rem 3.6rem 10.2rem;
  ${media.small} {
    width: 30rem;
    height: 43rem;
    padding: 4rem 0;
  }
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  top: 3rem;
  right: 3.2rem;
  svg {
    height: 100%;
    width: 2.4rem;
  }
`;

const SignUp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.6rem;
  color: #f3f4f6;
  font-size: 1.4rem;
  cursor: pointer;
`;
