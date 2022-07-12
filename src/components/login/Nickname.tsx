import React from 'react';
import styled from 'styled-components';

export default function Nickname({
  newNickname,
  getData,
}: {
  newNickname: string;
  getData: (_newNickname: string) => void;
}) {
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
  width: 25rem;
`;

const Input = styled.input`
  background-color: rgb(30, 41, 75);
  color: white;
  font-size: 1.7rem;
  text-justify: center;
  padding-left: 1rem;
  width: 100%;
`;

const Button = styled.button`
  font-family: PretendardRegular;
  font-weight: 600;
  height: 6rem;
  width: 100%;
  border-radius: 0.8rem;
  font-size: 1.5rem;
  background-color: white;
  margin-top: 2rem;
  cursor: pointer;
`;
