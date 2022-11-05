import { useState, useCallback } from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import useFriends from 'src/hooks/friend/useFriends';
import FriendList from '../profile/friends/FriendList';
import AddFriend from '../profile/friends/AddFriend';
import { detailedFriend } from '../../interface/singleFriend.interface';

export default function Friends() {
  const [categoryType, setCategoryType] = useState('friendList');
  const { isLoading, error, data } = useFriends();

  const onClickFriendList = useCallback(() => {
    setCategoryType('friendList');
  }, []);

  const onClickAddFriend = useCallback(() => {
    setCategoryType('addFriend');
  }, []);

  if (isLoading) return <>loading</>;
  if (error) return <>error</>;

  const acceptedFriends = data
    ?.filter((friend: detailedFriend) => friend.status === 'ACCEPTED')
    .map((friend: detailedFriend) => friend.sender || friend.receiver);

  const pendingSendFriends = data
    ?.filter(
      (friend: detailedFriend) =>
        friend.status === 'PENDING' && friend.role === 'SENDER',
    )
    .map((friend: detailedFriend) => friend.receiver);

  const pendingRecvFriends = data
    ?.filter(
      (friend: detailedFriend) =>
        friend.status === 'PENDING' && friend.role === 'RECEIVER',
    )
    .map((friend: detailedFriend) => friend.sender);

  return (
    <Components>
      <Category>
        <CategoryButton
          onClick={onClickFriendList}
          isOnClick={categoryType === 'friendList'}
        >
          친구
        </CategoryButton>
        <CategoryButton
          onClick={onClickAddFriend}
          isOnClick={categoryType === 'addFriend'}
        >
          친구신청
        </CategoryButton>
      </Category>
      <FriendComponent>
        {categoryType === 'friendList' ? (
          <FriendList friendList={acceptedFriends} />
        ) : (
          <AddFriend
            pendingSendFriends={pendingSendFriends}
            pendingRecvFriends={pendingRecvFriends}
          />
        )}
      </FriendComponent>
    </Components>
  );
}

const Components = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding-bottom: 2.8rem;
  border-bottom: 1px solid #4b5563;
`;

const FriendComponent = styled.div`
  width: 100%;
  max-height: 38.3rem;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Category = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 2rem;
  box-sizing: border-box;
`;

const CategoryButton = styled.button<{ isOnClick: boolean }>`
  font-family: IBMPlexSansKRRegular;
  font-size: 2rem;
  color: ${({ isOnClick }) => (isOnClick ? '#F9FAFB' : '#9CA3AF')};
  cursor: pointer;
  &:hover {
    color: #f9fafb;
  }
  ${media.small} {
    font-size: 1.6rem;
  }
`;
