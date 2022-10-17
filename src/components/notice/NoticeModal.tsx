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
        </Container>
        <Close>
          <Text onClick={closeForDay}>하루동안 열지않기</Text>
          <Text onClick={closeNoticeModal}>[닫기]</Text>
        </Close>
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

const Text = styled.p`
  font-size: 1.4rem;
  cursor: pointer;
`;

const Close = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
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
  width: fit-content;
  background-color: black;
  border-radius: 3rem;
  padding: 4rem;
  border: 3px solid rgba(255, 255, 255, 0.2);
`;
