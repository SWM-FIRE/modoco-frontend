import { useState } from 'react';
import styled from 'styled-components';
import FriendList from './Friends/FriendList';
import AddFriend from './Friends/AddFriend';

export default function Friends() {
  const [categoryType, setCategoryType] = useState('friendList');

  const onClickFriendList = () => {
    setCategoryType('friendList');
  };

  const onClickAddFriend = () => {
    setCategoryType('addFriend');
  };

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
      {categoryType === 'friendList' ? <FriendList /> : <AddFriend />}
    </Components>
  );
}

const Components = styled.div`
  width: 29.4rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  /* @media (max-width: 96rem) {
    width: 100%;
  } */
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
  color: ${({ isOnClick }) => (isOnClick ? '#111827' : '#9CA3AF')};
  background-color: ${({ isOnClick }) => (isOnClick ? '#FFFFFF' : 'none')};
  border-radius: ${({ isOnClick }) => (isOnClick ? '5rem' : 'none')};
  padding: ${({ isOnClick }) => (isOnClick ? '0.8rem 1.2rem' : 'none')};
  cursor: pointer;
`;
