import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import UserStore from '../../stores/userStore';
import Avater from './Avater';
import Buttons from './Buttons';

export default function UserInput({
  modalHandler,
}: {
  modalHandler: () => void;
}) {
  const navigate = useNavigate();
  const { nickname, uid, avatar, setNickname, setUid } = UserStore();
  const [newNickname, setNewNickname] = useState(nickname);
  console.log('newnickname ', newNickname);
  useEffect(() => {
    if (!localStorage.getItem('uid')) {
      const newUID = uuidv4();
      setUid(newUID);
      localStorage.setItem('uid', newUID);
    }
  }, []);

  const sendData = async () => {
    const API_URL: string = process.env
      .REACT_APP_SEND_USER_INFORMATION_URL as string;
    await axios
      .post(API_URL, {
        uid,
        nickname,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newNickname === null) {
      console.log('으악');
      return false;
    }
    // socket connection
    const payload = { nickname, uid, avatar };
    setNickname(newNickname);
    localStorage.setItem('nickname', newNickname);
    localStorage.setItem('avatar', avatar);
    console.log('payload: ', payload);
    sendData();
    // socket.emit('ENTER_ROOM', payload, (confirmRoomId) => {
    //   navigate(`screens`);
    // });
    modalHandler();
    navigate(`/main`);
    return true;
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Settings>
        <Avater />
        <Input
          autoComplete="off"
          value={newNickname}
          onChange={onChange}
          placeholder="Enter Nickname"
          id="nickname"
        />
      </Settings>
      <Buttons />
      {/* <Button>GitHub 계정</Button> */}
    </Form>
  );
}

const Form = styled.form`
  margin-top: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  width: 35rem;
  button,
  input {
    font-family: PretendardRegular;
    font-weight: 600;
    height: 6rem;
    width: 17rem;
    border-radius: 0.8rem;
  }
`;

const Settings = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Input = styled.input`
  background-color: rgb(30, 41, 75);
  color: white;
  font-size: 1.7rem;
  text-justify: center;
  padding-left: 1rem;
`;