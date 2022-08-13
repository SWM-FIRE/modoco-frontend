import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { API } from '../config';
import LoginModalStore from '../stores/loginModalStore';

export default function useLogin() {
  const navigate = useNavigate();
  const { closeLoginModal, openLoginModal } = LoginModalStore();
  const [inputs, setInputs] = useState({
    email: localStorage.getItem('email') ?? '',
    password: '',
  });
  const { email, password } = inputs;
  const [isError, setIsError] = useState(false);

  const onChange = (e) => {
    setIsError(false);
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const isDisable = () => {
    if (email === '' || password === '') return true;
    return false;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API.SESSION, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('email', inputs.email);
        toast.success('로그인 되었습니다.');
        navigate(`/main`);
        closeLoginModal();
      })
      .catch((err) => {
        console.log('[error]', err.response.data.message);
        setIsError(true);
        openLoginModal();
      });
  };

  return {
    inputs,
    onChange,
    onSubmit,
    isDisable,
    isError,
  };
}
