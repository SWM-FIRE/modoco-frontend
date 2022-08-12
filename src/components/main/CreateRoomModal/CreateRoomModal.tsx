import React from 'react';
import styled from 'styled-components';
import { ReactComponent as X } from '../../../assets/svg/X.svg';
import modal from '../../../stores/createRoomModalStore';
import useCreateRoom from '../../../hooks/useCreateRoom';
import CreateRoomForm from './CreateRoomForm';

export default function CreateRoomModal() {
  const { closeModal } = modal();
  const { inputs, onChange, onKeyPress, onDeleteTag, useRoomCreator } =
    useCreateRoom();

  const { isLoading, mutate, isSuccess } = useRoomCreator();

  if (isLoading)
    return <div style={{ color: 'white', fontSize: '5rem' }}>loading....</div>;
  if (isSuccess) {
    alert('방이 생성되었습니다.');
    closeModal();
  }
  return (
    <ModalBackground onClick={closeModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalController>
          <Title>방 생성하기</Title>
          <Close onClick={closeModal}>
            <X />
          </Close>
        </ModalController>
        <CreateRoomForm
          mutate={mutate}
          inputs={inputs}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onDeleteTag={onDeleteTag}
        />
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
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  display: flex;
  top: 0;
  z-index: 999;
`;

const ModalBox = styled.div`
  position: fixed;
  background-color: #23262f;
  border-radius: 2rem;
  width: 60.8rem;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3.2rem;
`;
