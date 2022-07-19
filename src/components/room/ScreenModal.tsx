import React from 'react';
import styled from 'styled-components';
import ModalPortal from '../atoms/ModalPotal';
import { ReactComponent as LeftArrow } from '../../assets/svg/arrow-left.svg';
import controlModal from '../../stores/controlModal';
import MyAvatar from '../../assets/avatar/MyAvatar';

export default function ScreenModal() {
  const { nickname, avatar, toggleModal } = controlModal();
  return (
    <ModalPortal>
      <ModalBackground>
        <ModalBox>
          <ModalController>
            <ArrowBox onClick={toggleModal}>
              <LeftArrow />
            </ArrowBox>
            <MyAvatar num={Number(avatar)} />
            <Nickname>{nickname}</Nickname>
          </ModalController>
          <Screen />
        </ModalBox>
      </ModalBackground>
    </ModalPortal>
  );
}

const Screen = styled.div`
  margin-top: 1.6rem;
  width: calc(100% - 1.43rem);
  height: 0;
  padding-bottom: 53%;
  background-color: #4a4a4a;
`;

const Nickname = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-weight: 400;
  font-size: 16px;
  align-self: center;
  color: #f8fafc;
`;

const ModalController = styled.div`
  svg {
    height: 100%;
    width: 3.2rem;
  }
  height: 3.2rem;
  display: flex;
  flex-direction: center;
  margin-top: 3.2rem;
  gap: 1rem;
`;

const ArrowBox = styled.div`
  cursor: pointer;
`;

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  top: 0;
  display: flex;
  z-index: 999;
`;

const ModalBox = styled.div`
  position: absolute;
  top: 18rem;
  left: 3rem;
  width: calc(100% - 50rem);
  height: calc(100% - 22rem);
  background-color: #0d0e13;
  padding-left: 1.43rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
`;
