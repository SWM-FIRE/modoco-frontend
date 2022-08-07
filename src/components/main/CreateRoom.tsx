import React from 'react';
import styled from 'styled-components';
import modal from '../../stores/createRoomModalStore';

export default function CreateRoom() {
  const { openModal } = modal();

  return (
    <Container>
      <DetailContainer>
        <Title>새로 방 생성</Title>
        <Detail>우리모두 모여서 도란도란 코딩해요.</Detail>
      </DetailContainer>
      <Enter onClick={openModal}>방 만들기 →</Enter>
    </Container>
  );
}

const Enter = styled.button`
  width: 12.6rem;
  height: 4.8rem;
  font-size: 1.6rem;
  font-family: SFProDisplayRegular;
  color: #fcfcfd;
  border: solid 0.2rem #777e90;
  border-radius: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05, 1.05);
    -ms-transform: scale(1.05, 1.05);
    -webkit-transform: scale(1.05, 1.05);
  }
`;

const DetailContainer = styled.div`
  position: relative;
  margin-top: 3.2rem;
  width: 29.3rem;
  height: 9.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Detail = styled.div`
  margin-top: 1.6rem;
  color: #777e90;
  font-size: 1.4rem;
`;

const Title = styled.div`
  color: #fcfcfd;
  font-size: 2.4rem;
  font-weight: 600;
`;

const Container = styled.div`
  background-color: #23262f;
  margin-right: 2.4rem;
  border-radius: 2rem;
  width: 22.5%;
  height: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px dashed rgba(107, 114, 128, 1);
  min-width: 29.4rem;
`;
