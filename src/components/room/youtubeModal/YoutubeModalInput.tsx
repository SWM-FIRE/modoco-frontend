import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from '../../../assets/svg/Search.svg';
import { searchYoutubeVideo } from '../../../api/main';
import replaceText from './replaceText';
import youtubeSearch from '../../../interface/youtubeSearch.interface';

export default function YoutubeModalInput({
  setSearchList,
}: {
  setSearchList: (_searchList: youtubeSearch[]) => void;
}) {
  const [newInput, setNewInput] = useState('');

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNewInput(event.target.value);
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchYoutubeVideo(`${newInput}`)
      .then((res) => {
        res.data.items.forEach((item: youtubeSearch) => {
          // eslint-disable-next-line no-param-reassign
          item.snippet.title = replaceText(item.snippet.title);
        });
        setSearchList(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <InputComponent onSubmit={onSubmit}>
      <SearchInput value={newInput} onChange={onChange} placeholder="검색" />
      <SearchButton>
        <Search />
      </SearchButton>
    </InputComponent>
  );
}

const InputComponent = styled.form`
  width: 100%;
  height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.input};
  margin: 1rem 0;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  height: 100%;
  padding: 0 1.4rem;
  border: none;
  background-color: ${({ theme }) => theme.input};
  font-size: 1.4rem;
  border-radius: 1rem;
  font-family: IBMPlexSansKRRegular;
  color: white;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 4.2rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    width: 40%;
    height: 40%;
  }
`;
