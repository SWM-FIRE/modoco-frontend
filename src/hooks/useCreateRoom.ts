import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import userStore from '../stores/userStore';
import { API } from '../config';
import modal from '../stores/createRoomModalStore';

export default function useCreateRoom() {
  const { closeModal } = modal();
  const [inputs, setInputs] = useState({
    title: '',
    details: '',
    total: '',
    theme: '',
    newTag: '',
    tags: [],
  });
  const { title, details, total, theme, newTag, tags } = inputs;
  const { uid } = userStore((state) => state);

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'newTag' && newTag.includes(' ')) {
      setInputs((prev) => {
        return {
          ...prev,
          newTag: prev.newTag.trim().replace(/ /g, '-'),
        };
      });
    }
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddTag();
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
      () =>
        axios.post(
          API.ROOM,
          {
            moderator: { uid },
            title,
            details,
            tags,
            total: Number(total),
            theme,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          },
        ),

      {
        onSuccess: () => {
          closeModal();
          window.location.reload();
        },
        onError: () => {
          toast.error('필수 입력란을 확인해주세요');
        },
      },
    );
    return mutation;
  };

  const onSubmit = () => {
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
  };
}
