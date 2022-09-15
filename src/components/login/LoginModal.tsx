import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ModalPortal from '../atoms/ModalPortal';
import Auths from './Auths';
import { ReactComponent as X } from '../../assets/svg/X.svg';
import ModalTitle from './ModalTitle';
import UserInput from './UserInput';
import LoginModalStore from '../../stores/loginModalStore';

export default function LoginModal() {
  const { closeLoginModal } = LoginModalStore();
  return (
    <ModalPortal>
      <ModalBackground onClick={closeLoginModal}>
        <ModalBox onClick={(e) => e.stopPropagation()}>
          <Close onClick={closeLoginModal}>
            <X />
          </Close>
          <ModalTitle />
          <UserInput />
          <SignUp onClick={closeLoginModal}>
            <Link to="/signUp">아직 회원이 아니신가요?</Link>
          </SignUp>
          <Auths />
        </ModalBox>
      </ModalBackground>
    </ModalPortal>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
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
  display: flex;
  width: 61rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 16rem;
  padding: 6.8rem 10.2rem 3.6rem 10.2rem;
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
