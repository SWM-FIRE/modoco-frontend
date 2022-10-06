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
    <Container>
      <Enter onClick={openCreateRoom} data-cy="create-room-modal-open">
        <Plus />
      </Enter>
      <Title>모도코 방을 만들어 보세요!</Title>
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
  cursor: pointer;
  transition: all 0.2s;
  svg {
    width: 70%;
    height: 70%;
  }

  &:hover {
    background-color: #e24834b9;
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
  ${media.medium} {
    min-width: 29.8rem;
  }
  ${media.small} {
    min-width: 18rem;
    height: 20rem;
  }
  ${media.xsmall} {
    min-width: 12.8rem;
  }
`;
