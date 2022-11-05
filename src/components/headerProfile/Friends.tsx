import { useState, useCallback } from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import useFriends from 'src/hooks/friend/useFriends';
import singleFriend from 'src/interface/singleFriend.interface';
import FriendList from '../profile/friends/FriendList';
import AddFriend from '../profile/friends/AddFriend';

export default function Friends() {
  const [categoryType, setCategoryType] = useState('friendList');
  const [acceptedFriends, setAcceptedFriends] = useState<singleFriend[]>([]);
  const [pendingSendFriends, setPendingSendFriends] = useState<singleFriend[]>(
    [],
  );
  const [pendingRecvFriends, setPendingRecvFriends] = useState<singleFriend[]>(
    [],
  );
  const { isLoading, error } = useFriends(
    setAcceptedFriends,
    setPendingSendFriends,
    setPendingRecvFriends,
  );

  const onClickFriendList = useCallback(() => {
    setCategoryType('friendList');
  }, []);

  const onClickAddFriend = useCallback(() => {
    setCategoryType('addFriend');
  }, []);

  if (isLoading) return <>loading</>;
  if (error) return <>error</>;

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
