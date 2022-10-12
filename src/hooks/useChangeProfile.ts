import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import userStore from '../stores/userStore';
import { changeProfile } from '../api/main';

export default function useChangeProfile() {
  const { setAvatar, setNickname, uid } = userStore();

  const queryClient = useQueryClient();

  const { avatar: myAvatar, nickname: myNickname } = userStore();

  const [inputs, setInputs] = useState({
    avatar: myAvatar,
    nickname: myNickname,
    groups: [],
    github_link: '',
    blog_link: '',
    email: '',
    status_quo: '',
    newGroup: '',
  });

  const { avatar, nickname, groups, newGroup } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onAddGroup = () => {
    setInputs({
      ...inputs,
      groups: [...groups, newGroup.trim()],
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
      if (groups.includes(newGroup)) {
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

  const { mutate: mutateProfile } = useMutation(() => changeProfile(inputs), {
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
    // mutate();
    mutateProfile();
  };

  const initInputs = ({ data }) => {
    const githubId = data.github_link.split('github.com/').pop();
    setInputs({
      ...inputs,
      avatar: data.avatar,
      nickname: data.nickname,
      groups: data.groups,
      github_link: githubId,
      blog_link: data.blog_link,
      email: data.email,
      status_quo: data.status_quo,
    });
  };

  return {
    onEnterGroup,
    inputs,
    onChange,
    onSubmit,
    onChangeAvatar,
    isDisable,
    initInputs,
  };
}
