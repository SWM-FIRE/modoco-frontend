import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import UserStore from '../../stores/userStore';
import Avater from './Avater';
import Nickname from './Nickname';

export default function UserInput({
  modalHandler,
}: {
  modalHandler: () => void;
}) {
  const navigate = useNavigate();
  const { nickname, uid, avatar, setNickname, setUid, setAvatar } = UserStore();
  const [newNickname, setNewNickname] = useState(nickname);
  const [newAvatar, setNewAvatar] = useState(avatar);
  const getNewNickname = (newNickname) => {
    setNewNickname(newNickname);
  };

  const getNewAvatar = (newAvatar) => {
    setNewAvatar(newAvatar);
  };

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
      return false;
    }
    // socket connection
    const payload = { nickname, uid, avatar };
    setNickname(newNickname);
    setAvatar(newAvatar);
    localStorage.setItem('nickname', newNickname);
    localStorage.setItem('avatar', newAvatar);

    console.log('payload: ', payload);
    sendData();
    // socket.emit('ENTER_ROOM', payload, (confirmRoomId) => {
    //   navigate(`screens`);
    // });
    modalHandler();
    navigate(`/main`);
    return true;
  };

  return (
    <Form onSubmit={onSubmit}>
      <Settings>
        <Avater getData={getNewAvatar} newAvatar={newAvatar} />
        <Nickname getData={getNewNickname} newNickname={newNickname} />
      </Settings>
      {/* <Button>GitHub 계정</Button> */}
    </Form>
  );
}

const Form = styled.form`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
  justify-content: center;
  z-index: 1001;
  /* width: 40rem; */
  input,
  button {
    font-family: PretendardRegular;
    font-weight: 600;
    height: 6rem;
    border-radius: 0.8rem;
  }
`;

const Settings = styled.div`
  gap: 3rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`;
