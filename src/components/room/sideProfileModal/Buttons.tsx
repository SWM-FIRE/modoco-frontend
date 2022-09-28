import React from 'react';
import styled from 'styled-components';
import useRequestFriend from 'src/hooks/friend/useRequestFriend';

export default function Buttons({
  isMe,
  uid: targetUid,
  toggle,
}: {
  isMe: boolean;
  uid: number;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { mutate, isLoading, isError, isSuccess } = useRequestFriend(targetUid);

  if (isLoading) return <>loading</>;
  if (isError) return <>error</>;
  if (isSuccess) return <>success</>;
  const sendRequest = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggle(false);
    mutate();
  };

  return (
    <Container>
      {!isMe && (
        <FriendComponent>
          <FriendRequest onClick={sendRequest}>친구요청</FriendRequest>
        </FriendComponent>
      )}
    </Container>
  );
}

const FriendRequest = styled.button`
  background-color: #ffffff;
  color: #111827;
  flex-grow: 1;
`;

const Container = styled.div`
  margin-top: 1.6rem;
  width: 100%;
  line-height: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.8rem;
  button {
    font-family: IBMPlexSansKRRegular;
    font-style: normal;
    font-weight: 500;
    font-size: 1.3rem;
    border-radius: 5rem;
    padding: 1.2rem 2rem;
    cursor: pointer;
  }
`;

const FriendComponent = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;
