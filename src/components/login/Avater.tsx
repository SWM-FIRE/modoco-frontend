import React from 'react';
import styled from 'styled-components';
import MyAvatar from '../../assets/avatar/MyAvatar';
import UserStore from '../../stores/userStore';

export default function Avater() {
  const { avatar, setAvatar } = UserStore();
  const onClick = () => {
    const randomNumber = Math.floor(Math.random() * 30) + 1; // 1~30 사이 정수 생성
    setAvatar(JSON.stringify(randomNumber));
    console.log(avatar);
  };
  return (
    <AvatarContainer>
      <MyAvatar num={Number(avatar)} />
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
