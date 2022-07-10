import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/svg/Search';
import tagStore from '../../stores/tagStore';

export default function Search() {
  const { setTag } = tagStore();

  const changeTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

  return (
    <SearchContainer>
      <SearhIconContainer>
        <SearchIcon />
      </SearhIconContainer>
      <Input placeholder="태그를 입력해보세요" onChange={changeTag} />
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

const SearhIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
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
`;
