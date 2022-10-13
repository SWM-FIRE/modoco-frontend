import React from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import { ReactComponent as Plus } from '../../assets/svg/Plus.svg';

export default function CreateRoom({
  openCreateRoom,
}: {
  openCreateRoom: () => void;
}) {
  return (
    <Container onClick={openCreateRoom}>
      <Enter data-cy="create-room-modal-open">
        <Plus />
      </Enter>
      <Title>새로운 방 만들기</Title>
    </Container>
  );
}

const Enter = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e24934;
  border-radius: 50%;
  transition: all 0.2s;
  cursor: pointer;
  svg {
    width: 70%;
    height: 70%;
  }
`;

const Title = styled.div`
  color: #fcfcfd;
  font-size: 2rem;
  font-weight: 600;
  font-family: IBMPlexSansKRRegular, Arial;
  ${media.small} {
    font-size: 1rem;
  }
`;

const Container = styled.div`
  background-color: #23262f;
  border-radius: 2rem;
  border: 1px dashed rgba(107, 114, 128, 1);
  width: 29.4rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    border: 1px dashed rgba(107, 114, 128, 0.5);
    ${Enter} {
      background-color: #e24834b9;
    }
  }
  ${media.xlarge} {
    width: 29.4rem;
  }
  ${media.medium} {
    width: 29.4rem;
  }
  ${media.small} {
    height: 18rem;
    width: 17rem;
    padding: 3rem 0.7rem;
  }
  ${media.xsmall} {
    height: 13rem;
    width: 12rem;
    padding: 2rem 0.7rem;
  }
  ${media.xxsmall} {
    width: 11rem;
  }
`;
