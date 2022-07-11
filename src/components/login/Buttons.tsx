import React from 'react';
import styled from 'styled-components';
import UserStore from '../../stores/userStore';

export default function Buttons() {
  const { nickname, setAvatar } = UserStore();
  const onClick = () => {
    const randomNumber = Math.floor(Math.random() * 30) + 1; // 1~30 사이 정수 생성
    setAvatar(JSON.stringify(randomNumber));
  };
  return (
    <Component>
      <Button type="button" onClick={onClick}>
        Random Character
      </Button>
      <Button disabled={nickname === null || !nickname.length}>Enter</Button>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  font-size: 1.5rem;
  background-color: white;
  margin-top: 2rem;
  cursor: pointer;
`;
