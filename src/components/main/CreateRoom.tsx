import React from 'react';
import styled from 'styled-components';

export default function CreateRoom() {
  return (
    <Container>
      <DetailContainer>
        <Title>새로 방 생성</Title>
        <Detail>우리모두 모여서 도란도란 코딩해요.</Detail>
      </DetailContainer>
      <Enter>방 만들기 →</Enter>
    </Container>
  );
}

const Enter = styled.button`
  position: absolute;
  bottom: 6.4rem;
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
`;

const DetailContainer = styled.div`
  position: relative;
  margin-top: 3.2rem;
  width: 29.3rem;
  height: 14.7rem;
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
`;

const Container = styled.div`
  background-color: #23262f;
  margin-right: 2.4rem;
  border-radius: 2rem;
  width: 34rem;
  height: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
