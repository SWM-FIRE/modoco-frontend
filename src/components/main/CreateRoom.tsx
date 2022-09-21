import React from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';

export default function CreateRoom({
  openCreateRoom,
}: {
  openCreateRoom: () => void;
}) {
  return (
    <Container>
      <DetailContainer>
        <Title>새로 방 생성</Title>
        <Detail>우리모두 모여서 도란도란 코딩해요.</Detail>
      </DetailContainer>
      <Enter onClick={openCreateRoom} data-cy="create-room-modal-open">
        방 만들기 →
      </Enter>
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

  ${media.small} {
    width: 8.6rem;
    height: 4rem;
    font-size: 1.2rem;
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
  ${media.small} {
    width: 100%;
    margin-top: 2.2rem;
  }
`;

const Detail = styled.div`
  margin-top: 1.6rem;
  color: #777e90;
  font-size: 1.4rem;
  text-align: center;
  height: 5rem;
`;

const Title = styled.div`
  color: #fcfcfd;
  font-size: 2.4rem;
  font-weight: 600;
  ${media.small} {
    font-size: 2rem;
  }
`;

const Container = styled.div`
  background-color: #23262f;
  margin: 1.4rem;
  border-radius: 2rem;
  width: 29.4rem;
  height: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px dashed rgba(107, 114, 128, 1);
  ${media.xlarge} {
    width: 29.4rem;
  }
  ${media.medium} {
    width: 33.6rem;
  }
  ${media.small} {
    height: 26rem;
    width: 18rem;
    margin: 0.7rem;
    padding: 3rem 0.7rem;
  }
  ${media.xsmall} {
    height: 20rem;
    width: 12.8rem;
    padding: 2rem 0.7rem;
  }
`;
