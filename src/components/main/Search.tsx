import React from 'react';
import media from 'src/styles/media';
import styled from 'styled-components';
import SearchIcon from '../../assets/svg/Search';

export default function Search({
  setSearchInput,
  searchInput,
}: {
  setSearchInput: (_value: string) => void;
  searchInput: string;
}) {
  const changeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <SearchContainer>
      <SearchIconContainer>
        <SearchIcon />
      </SearchIconContainer>
      <Input
        placeholder="방 이름 혹은 태그를 입력해보세요"
        onChange={changeSearchInput}
        value={searchInput}
      />
    </SearchContainer>
  );
}

const Input = styled.input`
  width: 90%;
  height: 100%;
  color: #f9fafb;
  background-color: transparent;
  outline: none;
  font-family: IBMPlexSansKRRegular;
`;

const SearchIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  ${media.small} {
    width: 15%;
  }
`;

const SearchContainer = styled.div`
  overflow: hidden;
  width: 52.6rem;
  height: 5.6rem;
  margin-top: 2.4rem;
  background-color: transparent;
  border-radius: 10rem;
  border: solid 0.1rem #374151;
  display: flex;
  align-items: center;
  ${media.small} {
    width: 90%;
  }
`;
