import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

export default function InputID() {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // socket connection
    const uid = uuidv4();
    const payload = { id, uid };
    // socket.emit('ENTER_ROOM', payload, (confirmRoomId) => {
    //   navigate(`screens`);
    // });
    console.log(payload);
    navigate(`screens`);
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
      <Button disabled={!id.length}>Enter</Button>
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
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
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
