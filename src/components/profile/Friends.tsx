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
      <FriendComponent>
        {categoryType === 'friendList' ? <FriendList /> : <AddFriend />}
      </FriendComponent>
    </Components>
  );
}

const Components = styled.div`
  width: 25%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  position: absolute;
  right: 1rem;
  top: 0;
  @media (max-width: 1020px) {
    position: static;
    width: 100%;
    margin-top: 6.4rem;
  }
`;

const FriendComponent = styled.div`
  @media (max-width: 1020px) {
    width: 100%;
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
  color: ${({ isOnClick }) => (isOnClick ? '#111827' : '#9CA3AF')};
  background-color: ${({ isOnClick }) => (isOnClick ? '#FFFFFF' : 'none')};
  border-radius: ${({ isOnClick }) => (isOnClick ? '5rem' : 'none')};
  padding: ${({ isOnClick }) => (isOnClick ? '0.8rem 1.2rem' : 'none')};
  cursor: pointer;
`;
