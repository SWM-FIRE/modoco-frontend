import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import UserStore from '../../stores/userStore';
import Avater from './Avater';
import Nickname from './Nickname';

interface UserType {
  uid: string;
  nickname: string;
  avatar: string;
}

let type: string;

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
      type = 'post';
    } else type = 'put';
  }, []);

  const userRequest = async (newUser: UserType) => {
    const API_URL: string = process.env
      .REACT_APP_SEND_USER_INFORMATION_URL as string;
    const { data } = await axios({
      method: type,
      url: API_URL,
      data: newUser,
    });
    return data;
  };

  const { mutate } = useMutation(userRequest, {
    onSuccess: () => {
      modalHandler();
      navigate('/main');
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newNickname === null) {
      return false;
    }
    setNickname(newNickname);
    setAvatar(newAvatar);
    localStorage.setItem('nickname', newNickname);
    localStorage.setItem('avatar', newAvatar);
    mutate({ uid, nickname: newNickname, avatar: newAvatar });

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
  justify-content: center;
  z-index: 1001;
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
