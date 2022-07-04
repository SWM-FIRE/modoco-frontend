import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import UserStore from '../../stores/userstore';

export default function InputNickname() {
  const navigate = useNavigate();
  const { nickname, uid, setNickname, setUid } = UserStore();

  useEffect(() => {
    if (localStorage.getItem('uid')) {
      console.log('existing user');
      setUid(localStorage.getItem('uid'));
      setNickname(localStorage.getItem('nickname'));
    } else {
      console.log('new user');
      const newUID = uuidv4();
      setUid(newUID);
      localStorage.setItem('uid', uid);
    }
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // socket connection
    const payload = { nickname, uid };
    localStorage.setItem('nickname', nickname);

    // socket.emit('ENTER_ROOM', payload, (confirmRoomId) => {
    //   navigate(`screens`);
    // });
    console.log(payload);
    navigate(`lobby`);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        autoComplete="off"
        value={nickname}
        onChange={onChange}
        placeholder="Enter ID"
        id="nickname"
      />
      <Button disabled={nickname === null || !nickname.length}>Enter</Button>
    </Form>
  );
}

const Form = styled.form`
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button,
  input {
    height: 5rem;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 30rem;
    font-size: 2rem;
    box-shadow: 2px 2px rgb(0 0 0 / 18%);
  }
`;

const Button = styled.button`
  background-color: #fbeaeb;
  margin-top: 2rem;
`;

const Input = styled.input`
  text-justify: center;
  padding-left: 1rem;
`;
