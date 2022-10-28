import React, { useEffect } from 'react';
import styled from 'styled-components';
import Contents from './Contents';
import mainModalStore from '../../stores/mainModalStore';

export default function NoticeModal() {
  const { closeNoticeModal } = mainModalStore();

  useEffect(() => {
    const noticeCheck = localStorage.getItem('noticeDate');
    if (noticeCheck && Number(noticeCheck) > Date.now() - 86400000) {
      closeNoticeModal();
    } else {
      localStorage.removeItem('noticeDate');
    }
  }, []);

  const closeForDay = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    closeNoticeModal();
    const date = Date.now();
    localStorage.setItem('noticeDate', date.toString());
  };

  return (
    <Screen onClick={closeNoticeModal}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Container>
          <Contents />
          <Close>
            <Text onClick={closeForDay}>하루동안 열지않기</Text>
            <Text onClick={closeNoticeModal}>닫기</Text>
          </Close>
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

const Close = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  cursor: pointer;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: fit-content;
  background-color: black;
  border-radius: 3rem;
  padding: 4rem;
  border: 3px solid rgba(255, 255, 255, 0.2);
`;
