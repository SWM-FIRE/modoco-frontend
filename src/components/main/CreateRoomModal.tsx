import React from 'react';
import styled from 'styled-components';
import { ReactComponent as X } from '../../assets/svg/X.svg';
import modal from '../../stores/createRoomModalStore';

export default function ScreenModal({ children }) {
  const { closeModal } = modal();
  return (
    <ModalBackground onClick={closeModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalController>
          <Title>방 생성하기</Title>
          <Close onClick={closeModal}>
            <X />
          </Close>
        </ModalController>
        {children}
      </ModalBox>
    </ModalBackground>
  );
}

const ModalController = styled.div`
  svg {
    height: 100%;
    width: 3.2rem;
  }
  height: 3.2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-family: IBMPlexMonoRegular;
  color: #f9fafb;
`;

const Close = styled.div`
  cursor: pointer;
  svg {
    height: 100%;
    width: 3.2rem;
  }
`;

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
  border-radius: 2rem;
  display: flex;
  width: 60.8rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 16rem;
  padding: 3.2rem;
`;
