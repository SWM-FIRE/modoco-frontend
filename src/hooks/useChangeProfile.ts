import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import userStore from '../stores/userStore';
import { changeMe } from '../api/main';

export default function useChangeProfile() {
  const { setAvatar, setNickname, setDescription, uid } = userStore();
  const queryClient = useQueryClient();
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
  const { avatar, nickname, description } = inputs;

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

  const { mutate } = useMutation(() => changeMe(uid, nickname, avatar), {
    onSuccess: (res) => {
      console.debug('[success]', res);
      setAvatar(avatar);
      setNickname(nickname);
      setDescription(description);
      toast.success('유저 정보가 변경되었습니다');
    },
    onError: (err) => {
      console.debug('[error] ', err);
      setInputs({
        ...inputs,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['userData', 'getOne', uid]);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return {
    inputs,
    onChange,
    onSubmit,
    onChangeAvatar,
    isDisable,
  };
}
