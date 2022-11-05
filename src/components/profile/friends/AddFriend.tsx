import React from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import singleFriend from 'src/interface/singleFriend.interface';
import FriendIcon from './FriendIcon';
import AcceptOrDecline from './AcceptOrDecline';

export default React.memo(function AddFriend({
  pendingSendFriends,
  pendingRecvFriends,
}: {
  pendingSendFriends: singleFriend[];
  pendingRecvFriends: singleFriend[];
}) {
  return (
    <>
      {pendingRecvFriends.map((friend, index) => (
        <Component key={Symbol(index).toString()}>
          <FriendIcon friend={friend} />
          <Contents>
            <AcceptOrDecline friend={friend} />
          </Contents>
        </Component>
      ))}
      {pendingSendFriends.map((friend, index) => (
        <Component key={Symbol(index).toString()}>
          <FriendIcon friend={friend} />
          <Contents>
            <Text>친구신청 보냄</Text>
          </Contents>
        </Component>
      ))}
    </>
  );
});

const Component = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.8rem;
  max-width: 28rem;
  ${media.small} {
    margin-top: 2rem;
    justify-content: space-between;
    width: 100%;
  }
`;

const Contents = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 15rem;
`;

const Text = styled.p`
  margin-top: 0.2rem;
  margin-left: 0.5rem;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  ${media.small} {
    display: none;
  }
`;
