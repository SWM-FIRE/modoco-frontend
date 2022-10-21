import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from '../../../assets/svg/Search.svg';

export default function YoutubeModalInput({ setInput }) {
  const [newInput, setNewInput] = useState('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewInput(event.target.value);
    setInput(event.target.value);
  };

  return (
    <InputComponent>
      <SearchInput value={newInput} onChange={onChange} placeholder="검색" />
      <SearchSvg>
        <Search />
      </SearchSvg>
    </InputComponent>
  );
}

const InputComponent = styled.div`
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

const SearchSvg = styled.button`
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
