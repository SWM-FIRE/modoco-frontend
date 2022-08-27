import React from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import vectors from '../atoms/Vectors';
import Search from './Search';
import PositionInterface from '../../interface/position.interface';

export default function TitleContainer() {
  const randomEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toast.error('준비중입니다.');
  };

  return (
    <Container>
      <Vector src={vectors.Circle} left={15} top={90} size={7} />
      <Vector src={vectors.Z} left={10} top={10} size={11} />
      <Vector src={vectors.Triangle} left={85} top={8} size={10} />
      <Vector src={vectors.Plus} left={84} top={85} size={11} />
      <TitleFlex>
        <Title color="ffffff">모여서</Title>
        <Title color="96CEB4">도란도란</Title>
      </TitleFlex>
      <Title color="ffffff">코딩해요</Title>
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

const Title = styled.h1<{ color: string }>`
  font-family: GmarketSansBold;
  margin-left: 2rem;
  font-size: 7.2rem;
  align-self: center;
  color: #${(props) => props.color};
`;

const Vector = styled.img<PositionInterface>`
  position: absolute;
  width: ${(props) => props.size}rem;
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}%;
`;

const TitleFlex = styled.div`
  display: flex;
`;
