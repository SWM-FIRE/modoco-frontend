import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/main';

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

  // const emailReg = /^.*@[0-9a-zA-Z가-힣]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const emailReg =
    /^[0-9a-zA-Z가-힣]([-_.]?[0-9a-zA-Z가-힣])*@[0-9a-zA-Z가-힣]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
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
    signUp(avatar, nickname, email, password)
      .then((res) => {
        console.debug('[success]', res);
        navigate(`/`);
        toast.success('가입된 이메일로 인증 메일을 발송했습니다.');
      })
      .catch((err) => {
        console.debug('[error] ', err);
        if (err.response.data.message === 'User already exists')
          toast.error('이미 존재하는 이메일입니다');
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
