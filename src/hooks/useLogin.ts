import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../config';
import LoginModalStore from '../stores/loginModalStore';

export default function useLogin() {
  const navigate = useNavigate();
  const { closeModal, openModal } = LoginModalStore();
  const [inputs, setInputs] = useState({
    email: '',
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
        console.log('[success]', res.data);
        localStorage.setItem('access_token', res.data.access_token);
        axios
          .get(API.ME, {
            headers: {
              Authorization: `Bearer ${res.data.access_token}`,
            },
          })
          .then((res) => {
            console.log('[me]', res.data);
            navigate(`/main`);
            closeModal();
          });
      })
      .catch((err) => {
        console.log('[error]', err.response.data.message);
        setIsError(true);
        openModal();
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
