import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import userStore from '../stores/userStore';
import { changeMe } from '../api/main';
import userAPI from '../components/profile/UserAPI.json';

export default function useChangeProfile() {
  const { setAvatar, setNickname, uid } = userStore();
  const queryClient = useQueryClient();

  const { avatar: myAvatar, nickname: myNickname } = userStore();

  const [inputs, setInputs] = useState({
    avatar: myAvatar,
    nickname: myNickname,
    group: [],
    github_link: '',
    blog_link: '',
    email: '',
    description: '',
    newGroup: '',
  });

  useEffect(() => {
    // setInput state
    setInputs({
      ...inputs,
      group: userAPI.group,
      github_link: userAPI.github_link,
      blog_link: userAPI.blog_link,
      email: userAPI.email,
      description: userAPI.description,
    });
  }, []);

  const { avatar, nickname, group, newGroup } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onAddGroup = () => {
    setInputs({
      ...inputs,
      group: [...group, newGroup.trim()],
    });
    setInputs((prev) => {
      return {
        ...prev,
        newGroup: '',
      };
    });
  };

  const onEnterGroup = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (group.includes(newGroup)) {
        toast.error('이미 추가된 그룹입니다.');
        setInputs((prev) => {
          return {
            ...prev,
            newGroup: '',
          };
        });
        return;
      }
      if (newGroup !== '') {
        onAddGroup();
      }
    }
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

  // const { mutate: mutateProfile } = useMutation(() => changeProfile(inputs), {
  //   onSuccess: (res) => {
  //     console.debug('[success]', res);
  //     setAvatar(avatar);
  //     setNickname(nickname);
  //     toast.success('유저 정보가 변경되었습니다');
  //   },
  //   onError: (err) => {
  //     console.debug('[error] ', err);
  //     setInputs({
  //       ...inputs,
  //     });
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(['userData', 'getOne', uid]);
  //   },
  // });

  const { mutate } = useMutation(() => changeMe(uid, nickname, avatar), {
    onSuccess: (res) => {
      console.debug('[success]', res);
      setAvatar(avatar);
      setNickname(nickname);
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
    // mutateProfile();
  };

  return {
    onEnterGroup,
    inputs,
    onChange,
    onSubmit,
    onChangeAvatar,
    isDisable,
  };
}
