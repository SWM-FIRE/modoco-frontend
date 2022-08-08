import React from 'react';
import styled from 'styled-components';
import ModalPortal from '../atoms/ModalPortal';
import { ReactComponent as X } from '../../assets/svg/X.svg';
import { ReactComponent as MainFire } from '../../assets/svg/MainFire.svg';
import ModalTitle from './ModalTitle';
import UserInput from './UserInput';
import LoginModalStore from '../../stores/loginModalStore';

export default function Modal() {
  const { closeModal } = LoginModalStore();
  return (
    <ModalPortal>
      <ModalBackground onClick={closeModal}>
        <ModalBox onClick={(e) => e.stopPropagation()}>
          <Close onClick={closeModal}>
            <X />
          </Close>
          <ModalTitle />
          <Logo>
            <MainFire />
          </Logo>
          <UserInput />
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
  padding: 6.8rem 10.2rem 3.3rem 10.2rem;
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

const Logo = styled.div`
  svg {
    width: 10.8rem;
    height: 10.8rem;
  }
`;
