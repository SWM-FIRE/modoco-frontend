import React from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import Search from './Search';
import { ReactComponent as MainFire } from '../../assets/svg/MainFire.svg';

export default function TitleContainer() {
  const randomEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toast.error('준비중입니다.');
  };

  return (
    <Container>
      <MainFire />
      <Search />
      <RandomEnter onClick={randomEnter}>랜덤 입장</RandomEnter>
    </Container>
  );
}

const RandomEnter = styled.button`
  width: 16.1rem;
  height: 5.4rem;
  background-color: white;
  margin-top: 4rem;
  border-radius: 6.2rem;
  cursor: pointer;
  color: black;
  font-size: 1.8rem;
  font-family: JostRegular;
  font-weight: 700;
`;

const Container = styled.div`
  position: relative;
  margin-top: 6rem;
  width: 100%;
  height: 35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
