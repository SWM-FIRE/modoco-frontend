import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../config';
import userStore from '../stores/userStore';

export default function useSignUp() {
  const navigate = useNavigate();
  // const { uid } = userStore();
  const {
    avatar: myAvatar,
    nickname: myNickname,
    description: myDescription,
  } = userStore();
  const [inputs, setInputs] = useState({
    avatar: myAvatar,
    nickname: myNickname,
    description: myDescription,
  });
  const { avatar, nickname } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const isDisable = () => {
    if (nickname === '') return true;
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
      .put(
        API.USER,
        {
          avatar,
          nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        },
      )
      .then((res) => {
        console.debug('[success]', res);
        navigate(`/`);
        toast.success('유저 정보가 변경되었습니다');
      })
      .catch((err) => {
        console.debug('[error] ', err);
        setInputs({
          ...inputs,
        });
      });
  };

  return {
    inputs,
    onChange,
    onSubmit,
    onChangeAvatar,
    isDisable,
  };
}
