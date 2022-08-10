import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../config';

export default function useLogin() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const isDisable = () => {
    if (email === '' || password === '') return true;
    return false;
  };

  const onSubmit = () => {
    axios
      .post(API.SESSION, {
        email,
        password,
      })
      .then((res) => {
        console.log('[success]', res.data.access_token);
        localStorage.setItem('access_token', res.data.access_token);
        navigate(`/main`);
      })
      .catch((err) => {
        console.log('[error] ', err);
      });
  };

  return {
    inputs,
    onChange,
    onSubmit,
    isDisable,
  };
}
