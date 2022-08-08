import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import UserStore from '../../stores/userStore';
import Avater from './Avatar';
import Nickname from './Nickname';
import userInterface from '../../interface/user.interface';
import { API } from '../../config';
import LoginModalStore from '../../stores/loginModalStore';

let type: string;

/**
 * @brief 유저 정보(아바타, 닉네임) 수정
 * @param modalHandler - modal을 닫는 함수
 */
export default function UserInput() {
  const { nickname, uid, avatar, setNickname, setUid, setAvatar } = UserStore();
  const [newNickname, setNewNickname] = useState(nickname);
  const [newAvatar, setNewAvatar] = useState(avatar);
  const { closeModal } = LoginModalStore();

  const getNewNickname = (newNickname) => {
    setNewNickname(newNickname);
  };
  const getNewAvatar = (newAvatar) => {
    setNewAvatar(newAvatar);
  };

  useEffect(() => {
    /**
     * @brief 유저 정보 수정
     * validUID인 경우 -> 유저 정보 수정
     * invalidUID인 경우 -> 유저 정보 생성
     */
    if (localStorage.getItem('uid')) {
      const myUid = localStorage.getItem('uid');
      setUid(myUid);
      console.log('my uid', myUid);
      axios.get((API.USER as string) + myUid).then((res) => {
        console.log('axios good');
        if (res.data.uid) {
          // valid uid
          console.log('valid uid', res.data.uid);
          type = 'put';
        } else {
          console.log('will post');
          // invalid uid
          type = 'post';
        }
      });
    } else {
      console.log('uid is null');
      // no uid
      const newUID = uuidv4();
      setUid(newUID);
      localStorage.setItem('uid', newUID);
      type = 'post';
    }
  }, []);

  const userRequest = async (newUser: userInterface) => {
    const { data } = await axios({
      method: type,
      url: API.USER,
      data: newUser,
    });
    return data;
  };

  const { mutate } = useMutation(userRequest, {
    onSuccess: () => {
      closeModal();
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
    </Form>
  );
}

const Form = styled.form`
  margin-top: 4rem;
  z-index: 1001;
  input,
  button {
    font-family: PretendardRegular;
    font-weight: 600;
    height: 6rem;
    border-radius: 0.8rem;
    font-size: 1.5rem;
  }
`;

const Settings = styled.div`
  gap: 3rem;
  display: flex;
  align-items: flex-end;
`;
