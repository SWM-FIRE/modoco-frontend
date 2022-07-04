import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import IdStore from '../../stores/idstore';

export default function InputID() {
  const navigate = useNavigate();
  const { id, uid, setId, setUid } = IdStore();

  useEffect(() => {
    if (localStorage.getItem('uid')) {
      console.log('existing user');
      setUid(localStorage.getItem('uid'));
      setId(localStorage.getItem('id'));
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
    const payload = { id, uid };
    localStorage.setItem('id', id);

    // socket.emit('ENTER_ROOM', payload, (confirmRoomId) => {
    //   navigate(`screens`);
    // });
    console.log(payload);
    navigate(`lobby`);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        autoComplete="off"
        value={id}
        onChange={onChange}
        placeholder="Enter ID"
        id="nickname"
      />
      <Button disabled={id === null || !id.length}>Enter</Button>
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
