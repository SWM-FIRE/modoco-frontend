import React from 'react';
import styled from 'styled-components';
import useAcceptFriendRequest from 'src/hooks/friend/useAcceptFriendRequest';
import useDeleteFriendRequest from 'src/hooks/friend/useDeleteFriendRequest';

export default function AcceptOrDecline({ data }) {
  const {
    mutate: acceptMutate,
    isLoading: acceptLoading,
    isError: acceptError,
  } = useAcceptFriendRequest(data?.sender.uid);

  const {
    mutate: deleteMutate,
    isLoading: deleteLoading,
    isError: deleteError,
  } = useDeleteFriendRequest(data?.sender.uid);

  if (acceptLoading || deleteLoading) return null;
  if (acceptError || deleteError) return null;

  const acceptRequest = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    acceptMutate();
  };

  const deleteRequest = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteMutate();
  };

  return (
    <Container>
      <Text>
        <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          `{data?.sender.nickname}`
        </span>
        님이 친구 요청을 전송하였습니다
      </Text>
      <Buttons>
        <Button onClick={deleteRequest} color="#ff8e89">
          거절하기
        </Button>
        <Button onClick={acceptRequest} color="#76e8ad">
          수락하기
        </Button>
      </Buttons>
    </Container>
  );
}

const Button = styled.button<{ color: string }>`
  padding: 1rem;
  border-radius: 2rem;
  font-size: 1.5rem;
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
  cursor: pointer;
  &:hover {
    transform: scale(1.04);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Text = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
`;
