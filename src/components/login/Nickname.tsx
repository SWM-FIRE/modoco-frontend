import React from 'react';
import styled from 'styled-components';
import NicknameInterface from '../../interface/nickname.interface';

export default function Nickname({ newNickname, getData }: NicknameInterface) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    getData(event.target.value);
  };

  return (
    <Component>
      <Input
        autoComplete="off"
        value={newNickname}
        onChange={onChange}
        placeholder="닉네임을 입력해주세요"
        id="nickname"
      />
      <Button>확인</Button>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 12rem;
  width: 28rem;
`;

const Input = styled.input`
  background-color: rgb(30, 41, 75);
  color: white;
  font-size: 1.5rem;
  text-justify: center;
  padding-left: 1rem;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  font-size: 1.5rem;
  background-color: white;
  margin-top: 1.8rem;
  cursor: pointer;
`;
