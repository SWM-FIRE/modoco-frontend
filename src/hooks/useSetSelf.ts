import { useEffect } from 'react';
import axios from 'axios';
import { API } from '../config';
import UserStore from '../stores/userStore';

export default function useSetSelf() {
  const { setNickname, setAvatar } = UserStore();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      axios
        .get(API.ME, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log('[me]', res.data);
          setNickname(res.data.nickname);
          setAvatar(res.data.avatar);
        });
    }
  }, []);
}
