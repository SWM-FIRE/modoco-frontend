import { useQueryClient } from 'react-query';
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import userStore from '../stores/userStore';
import { createRoom } from '../api/main';

export default function useCreateRoom({
  closeCreateRoom,
}: {
  closeCreateRoom: () => void;
}) {
  const queryClient = useQueryClient();
  const [inputs, setInputs] = useState({
    title: '',
    details: '',
    total: '',
    theme: '',
    newTag: '',
    tags: [],
    isPrivate: false,
    roomPassword: '',
  });
  const { title, details, total, theme, newTag, tags } = inputs;
  const { uid } = userStore((state) => state);

  const onChange = (e) => {
    if (e.target.name === 'isPrivate') {
      if (e.target.value === 'true') {
        setInputs({ ...inputs, isPrivate: true });
      } else setInputs({ ...inputs, isPrivate: false });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name === 'newTag') {
      setInputs((prev) => {
        return {
          ...prev,
          newTag: prev.newTag,
        };
      });
    }
  };

  const onClickTheme = (theme: string) => {
    setInputs({
      ...inputs,
      theme,
    });
  };

  const onClickTotal = (e) => {
    setInputs({
      ...inputs,
      total: e.target.innerText,
    });
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (tags.includes(newTag)) {
        toast.error('이미 추가된 태그입니다.');
        setInputs((prev) => {
          return {
            ...prev,
            newTag: '',
          };
        });
        return;
      }
      if (newTag !== '') {
        onAddTag();
      }
    }
  };

  const onAddTag = () => {
    setInputs({
      ...inputs,
      tags: [...tags, newTag.trim()],
    });
    setInputs((prev) => {
      return {
        ...prev,
        newTag: '',
      };
    });
  };

  const onDeleteTag = (e, index) => {
    setInputs({
      ...inputs,
      tags: tags.filter((tag, i) => i !== index),
    });
  };

  const useRoomCreator = () => {
    const mutation = useMutation(
      () => createRoom({ uid }, title, details, tags, Number(total), theme),
      {
        onSuccess: () => {
          closeCreateRoom();
          toast.success('방이 생성되었습니다.');
        },
        // 새로고침하지 않아도 바로 반영되게 쿼리 invalidate
        onSettled: () => {
          queryClient.invalidateQueries('roomData');
        },
      },
    );
    return mutation;
  };

  const isDisable = () => {
    if (theme === '' || total === '' || title === '') return true;
    return false;
  };

  const onSubmit = () => {
    if (isDisable()) return;
    const { mutate } = useRoomCreator();
    mutate();
  };

  return {
    inputs,
    onChange,
    onKeyPress,
    onDeleteTag,
    onSubmit,
    useRoomCreator,
    onClickTheme,
    onClickTotal,
    isDisable,
  };
}
