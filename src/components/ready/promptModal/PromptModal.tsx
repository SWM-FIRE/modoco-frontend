import React from 'react';
import styled from 'styled-components';
import Contents from './Contents';

export default function PromptModal({ setIsPrompt }) {
  return (
    <Screen onClick={setIsPrompt}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Container>
          <Contents />
          <Close onClick={() => setIsPrompt(false)}>닫기</Close>
        </Container>
      </Content>
    </Screen>
  );
}

const Content = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Screen = styled.div`
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  position: relative;
  width: 40rem;
  background-color: black;
  border-radius: 3rem;
  border: 3px solid rgba(255, 255, 255, 0.2);
`;

const Close = styled.button`
  color: white;
  position: absolute;
  right: 4.1rem;
  bottom: 2rem;
  font-size: 1.4rem;
  cursor: pointer;
  color: #4b86d4;
`;
