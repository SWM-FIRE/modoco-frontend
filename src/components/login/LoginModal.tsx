import React from 'react';
import styled from 'styled-components';
import vectors from '../atoms/Vectors';
import ModalTitle from './ModalTitle';
import UserInput from './UserInput';

export default function LoginModal({
  modalHandler,
}: {
  modalHandler: () => void;
}) {
  return (
    <>
      <Vector src={vectors.Lamp} left={0} top={0} size={40} />
      <Vector src={vectors.Book} left={28.7} top={10.4} size={60} />
      <ModalTitle />
      <UserInput modalHandler={modalHandler} />
    </>
  );
}

interface Position {
  size?: number;
  left?: number;
  top: number;
  right?: number;
}

const Vector = styled.img<Position>`
  position: absolute;
  width: ${(props) => props.size}rem;
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}%;
  opacity: 0.5;
  z-index: 1000;
`;
