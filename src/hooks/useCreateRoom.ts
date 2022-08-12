import { useState } from 'react';
import axios from 'axios';
import userStore from '../stores/userStore';
import { API } from '../config';

export default function useCreateRoom() {
  const [inputs, setInputs] = useState({
    title: '',
    details: '',
    total: '',
    theme: '',
    newTag: '',
    tags: [],
  });
  const { title, details, total, theme, newTag, tags } = inputs;
  const { uid } = userStore();

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

  const onSubmit = () => {
    axios
      .post(
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
      )
      .then((res) => {
        console.log('[success]', res);
      })
      .catch((err) => {
        console.log('[error] ', err);
      });
  };

  return {
    inputs,
    onChange,
    onKeyPress,
    onDeleteTag,
    onSubmit,
  };
}
