import React from 'react';
import styled from 'styled-components';
import MyAvatar from '../../assets/avatar/MyAvatar';
import AvatarInterface from '../../interface/avatar.interface';

export default function Avatar({ newAvatar, getData }: AvatarInterface) {
  const onClick = () => {
    const randomNumber = Math.floor(Math.random() * 30) + 1; // 1~30 사이 정수 생성
    getData(JSON.stringify(randomNumber));
  };
  return (
    <Container>
      <MyAvatar num={Number(newAvatar)} />
      <Button type="button" onClick={onClick}>
        아바타 재생성
      </Button>
    </Container>
  );
}

const Container = styled.div`
  height: 23rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    width: 80%;
    height: 80%;
  }
`;

const Button = styled.button`
  width: 80%;
  background-color: white;
  margin-top: 2rem;
  cursor: pointer;
`;
