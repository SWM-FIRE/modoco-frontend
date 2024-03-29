import React from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import useAcceptFriendRequest from 'src/hooks/friend/useAcceptFriendRequest';
import useDeleteFriendRequest from 'src/hooks/friend/useDeleteFriendRequest';

export default function AcceptOrDecline({ friend }) {
  const {
    mutate: acceptMutate,
    isLoading: acceptLoading,
    isError: acceptError,
  } = useAcceptFriendRequest(friend?.uid);

  const {
    mutate: deleteMutate,
    isLoading: deleteLoading,
    isError: deleteError,
  } = useDeleteFriendRequest(friend?.uid);

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
    <Buttons>
      <Button color="34d399" onClick={acceptRequest}>
        수락
      </Button>
      <Button color="fb7185" onClick={deleteRequest}>
        거절
      </Button>
    </Buttons>
  );
}

const Buttons = styled.div`
  margin-top: 0.8rem;
  display: flex;
  gap: 1rem;
`;

const Button = styled.button<{ color: string }>`
  color: #${(props) => props.color};
  border: 1px solid #${(props) => props.color};
  border-radius: 5rem;
  padding: 0.4rem 1.6rem;
  font-size: 1.5rem;
  min-width: 6rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  ${media.small} {
    display: none;
  }
`;
