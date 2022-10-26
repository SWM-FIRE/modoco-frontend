import React from 'react';
import styled from 'styled-components';
import { ReactComponent as X } from '../../../assets/svg/X.svg';
import youtubeSearch from '../../../interface/youtubeSearch.interface';

export default React.memo(function PlaylistItem({
  item,
  index,
  removeItem,
}: {
  item: youtubeSearch;
  index: number;
  removeItem: (_index: number) => void;
}) {
  return (
    <Item>
      <Title>{item.snippet.title}</Title>
      <DeleteItem type="button" onClick={() => removeItem(index)}>
        <X />
      </DeleteItem>
    </Item>
  );
});

const Item = styled.li`
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  transition: all 0.2s ease-in-out;
  width: 100%;
  padding: 0.3rem 0.5rem;
  &:hover {
    background-color: #3b3a3a91;
  }
`;

const Title = styled.span`
  white-space: nowrap;
  overflow-y: scroll;
  flex-grow: 1;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const DeleteItem = styled.button`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.4rem;
  svg {
    width: 100%;
    height: 100%;
  }
  &:hover {
    background-color: #3b3a3a91;
  }
`;
