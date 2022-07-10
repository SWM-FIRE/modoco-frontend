import React from 'react';
import styled from 'styled-components';
import vectors from './Vectors';

export default function Modal({ modalHandler }: { modalHandler: () => void }) {
  return (
    <ModalBackground onClick={modalHandler}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <VectorX
          src={vectors.X}
          left={93}
          top={6}
          size={2}
          onClick={modalHandler}
        />
      </ModalBox>
    </ModalBackground>
  );
}

interface Position {
  size?: number;
  left?: number;
  top: number;
  right?: number;
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

const VectorX = styled.img<Position>`
  position: absolute;
  width: ${(props) => props.size}rem;
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}%;
  cursor: pointer;
`;

const ModalBox = styled.div`
  position: fixed;
  background-color: rgb(22, 29, 52);
  border-radius: 1rem;
  display: flex;
  width: 842px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 20rem;
  padding: 9rem 3rem 7rem 3rem;
`;
