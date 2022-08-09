import { useState } from 'react';
import axios from 'axios';
import { API } from '../config';

export default function useSignUp() {
  const [inputs, setInputs] = useState({
    avatar: 1,
    nickname: '',
    email: '',
    password: '',
    passwordCheck: '',
  });
  const { avatar, nickname, email, password } = inputs;

  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const passwordReg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~@$!%*^#?&])[A-Za-z\d~@$!%*^#?&]{8,16}$/;

  const isValidEmail = emailReg.test(email);
  const isValidPassword = passwordReg.test(password);

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeAvatar = () => {
    setInputs({
      ...inputs,
      avatar: Math.floor(Math.random() * 30) + 1,
    });
  };

  const onSubmit = () => {
    axios
      .post(API.ROOM, {
        avatar,
        nickname,
        password,
      })
      .then((res) => {
        console.log('[success]', res);
      })
      .catch((err) => {
        console.log('[error] ', err);
      });
  };

  return {
    inputs,
    onChange,
    onSubmit,
    onChangeAvatar,
    isValidEmail,
    isValidPassword,
  };
}
