import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as X } from '../../../assets/svg/X.svg';

export default function RoomPasswordModal({ closeModal }) {
  const [password, setPassword] = useState('');
  const onChange = (event) => {
    setPassword(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    closeModal();
  };
  const isDisabled = () => {
    if (password.length === 4) {
      return false;
    }
    return true;
  };
  return (
    <ModalBackground onClick={closeModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalController>
          <Title>비밀번호를 입력해주세요</Title>
          <Close onClick={closeModal}>
            <X />
          </Close>
        </ModalController>
        <Form onSubmit={onSubmit}>
          <Label htmlFor="password">비밀번호 *</Label>
          <PasswordInput
            id="password"
            name="password"
            type="text"
            value={password}
            onChange={onChange}
            placeholder="비밀번호 4글자를 입력해주세요"
            required
            maxLength={4}
            minLength={4}
          />
          <Button disabled={isDisabled()}>확인</Button>
        </Form>
      </ModalBox>
    </ModalBackground>
  );
}

const ModalController = styled.div`
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
  width: 2.4rem;
  height: 2.4rem;
  svg {
    height: 100%;
    width: 100%;
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
  z-index: 5;
`;

const ModalBox = styled.div`
  background-color: #23262f;
  border-radius: 2rem;
  width: 41rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 3.2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: IBMPlexMonoRegular;
`;

const Label = styled.label`
  color: #b0b8c1;
  font-size: 1.4rem;
  margin-top: 2.1rem;
`;

const Button = styled.button`
  background-color: white;
  border-radius: 2.3rem;
  height: 4.7rem;
  margin-top: 2.45rem;
  cursor: pointer;
  font-size: 1.5rem;
  font-family: IBMPlexMonoRegular;
  :disabled {
    cursor: default;
    background-color: #a9afb8;
  }
`;

const PasswordInput = styled.input`
  height: 4.9rem;
  background: transparent;
  outline: none;
  color: #f9fafb;
  font-size: 1.5rem;
  background-color: #191f28;
  padding: 0 1.6rem;
  margin-top: 1.5rem;
  border-radius: 0.6rem;
`;
