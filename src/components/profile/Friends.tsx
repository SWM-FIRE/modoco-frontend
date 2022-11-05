import { useState } from 'react';
import styled from 'styled-components';
import useFriends from 'src/hooks/friend/useFriends';
import FriendList from './friends/FriendList';
import AddFriend from './friends/AddFriend';

export default function Friends({ isModal }: { isModal: boolean }) {
  const [categoryType, setCategoryType] = useState('friendList');
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [pendingSendFriends, setPendingSendFriends] = useState([]);
  const [pendingRecvFriends, setPendingRecvFriends] = useState([]);
  const { isLoading, error } = useFriends(
    setAcceptedFriends,
    setPendingSendFriends,
    setPendingRecvFriends,
  );
  if (isLoading) return <>loading</>;
  if (error) return <>error</>;

  const onClickFriendList = () => {
    setCategoryType('friendList');
  };

  const onClickAddFriend = () => {
    setCategoryType('addFriend');
  };

  return (
    <Components isModal={isModal}>
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
      <FriendComponent isModal={isModal}>
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

const Components = styled.div<{ isModal: boolean }>`
  width: 25%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  position: absolute;
  right: 1rem;
  top: 0;
  @media (max-width: ${(props) => (props.isModal ? '100vw ' : '1020px')}) {
    position: static;
    padding: 0 3.2rem;
    width: 100%;
    margin-top: 6.4rem;
  }
`;

const FriendComponent = styled.div<{ isModal: boolean }>`
  width: 100%;
  @media (max-width: ${(props) => (props.isModal ? '100vw ' : '1020px')}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    max-height: 15rem;
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
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
`;
