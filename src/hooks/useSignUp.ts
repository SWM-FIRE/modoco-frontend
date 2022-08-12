import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../config';

export default function useSignUp() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    avatar: 1,
    nickname: '',
    email: '',
    password: '',
    passwordCheck: '',
  });
  const { avatar, nickname, email, password, passwordCheck } = inputs;

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

  const isDisable = () => {
    if (nickname === '' || email === '' || password === '') return true;
    if (!isValidEmail || !isValidPassword) {
      return true;
    }
    if (password !== passwordCheck) return true;
    return false;
  };

  const onChangeAvatar = () => {
    setInputs({
      ...inputs,
      avatar: Math.floor(Math.random() * 30) + 1,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API.USER, {
        avatar,
        nickname,
        email,
        password,
      })
      .then((res) => {
        console.log('[success]', res);
        navigate(`/`);
        alert('회원가입 성공');
      })
      .catch((err) => {
        console.log('[error] ', err);
        if (err.response.data.message === 'User already exists')
          alert('이미 존재하는 이메일입니다.');
        setInputs({
          ...inputs,
          email: '',
          password: '',
          passwordCheck: '',
        });
      });
  };

  return {
    inputs,
    onChange,
    onSubmit,
    onChangeAvatar,
    isValidEmail,
    isValidPassword,
    isDisable,
  };
}
