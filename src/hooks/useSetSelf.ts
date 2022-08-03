import { useEffect } from 'react';
import axios from 'axios';
import { API } from '../config';
import UserStore from '../stores/userStore';

export default function useSetSelf() {
  const { setNickname, setUid, setAvatar } = UserStore();

  useEffect(() => {
    if (localStorage.getItem('uid')) {
      const myUid = localStorage.getItem('uid');
      axios.get((API.USER as string) + myUid).then((res) => {
        if (res.data.uid) {
          console.log('existing user', res.data);
          setNickname(res.data.nickname);
          setAvatar(res.data.avatar);
          setUid(myUid);
        }
      });
    }
  }, []);
}
