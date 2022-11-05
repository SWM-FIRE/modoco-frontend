// from User Profile
import React from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import useDeleteFriendRequest from 'src/hooks/friend/useDeleteFriendRequest';
import useAcceptFriendRequest from 'src/hooks/friend/useAcceptFriendRequest';

interface FriendInterface {
  status: string;
  role: string;
  sender?: {
    uid: number;
    nickname: string;
    email: string;
    avatar: string;
  };
  receiver?: {
    uid: number;
    nickname: string;
    email: string;
    avatar: string;
  };
}

export default function Pending({
  friendId,
  friend,
}: {
  friendId: number;
  friend: FriendInterface;
}) {
  const {
    mutate: deleteMutate,
    isLoading: deleteLoading,
    isError: deleteError,
  } = useDeleteFriendRequest(friendId);
  const {
    mutate: acceptMutate,
    isLoading: acceptLoading,
    isError: acceptError,
  } = useAcceptFriendRequest(friendId);

  if (deleteLoading || acceptLoading) {
    return <>loading</>;
  }
  if (deleteError || acceptError) return <>error</>;

  const sendDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteMutate();
  };

  const sendAccept = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    acceptMutate();
  };
  return (
    <Container>
      {friend?.role === 'SENDER' && <Text>친구 요청을 보냈습니다</Text>}
      {friend?.role === 'RECEIVER' && (
        <>
          <p style={{ color: 'white', marginBottom: '2rem' }}>
            유효한 친구요청이 있습니다
          </p>
          <Buttons>
            <Button onClick={sendDelete} color="#ff8e89">
              거절하기
            </Button>
            <Button onClick={sendAccept} color="#76e8ad">
              수락하기
            </Button>
          </Buttons>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 3rem;
`;

const Text = styled.div`
  font-size: 1.4rem;
  border-radius: 1rem;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.3);
  max-width: 20rem;
  color: #fff;
`;

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
  justify-content: flex-start;
  gap: 5rem;
  align-items: center;
  ${media.small} {
    gap: 0;
    margin: 0 2rem;
    justify-content: space-between;
  }
`;
