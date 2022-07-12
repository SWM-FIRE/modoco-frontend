import React from 'react';
import styled from 'styled-components';
import MyAvatar from '../../assets/avatar/MyAvatar';

export default function Avater({
  newAvatar,
  getData,
}: {
  newAvatar: string;
  getData: (_newAvatar: string) => void;
}) {
  const onClick = () => {
    const randomNumber = Math.floor(Math.random() * 30) + 1; // 1~30 사이 정수 생성
    getData(JSON.stringify(randomNumber));
  };
  return (
    <AvatarContainer>
      <MyAvatar num={Number(newAvatar)} />
      <Button type="button" onClick={onClick}>
        아바타 재생성
      </Button>
    </AvatarContainer>
  );
}

const AvatarContainer = styled.div`
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
  font-size: 1.5rem;
  background-color: white;
  margin-top: 2rem;
  cursor: pointer;
`;
