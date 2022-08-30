import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API } from '../config';
import UserStore from '../stores/userStore';

export default function useSetSelf() {
  const { setNickname, setAvatar, setUid, setClear, setTime } = UserStore(
    (state) => state,
  );
  const navigate = useNavigate();
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
          setNickname(res.data.nickname);
          setAvatar(res.data.avatar);
          setUid(res.data.uid.toString());
          axios
            .get(API.RECORDS, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.data.length !== 0) {
                setTime(Number(res.data[0].duration) * 60);
              }
            });
        })
        .catch(() => {
          localStorage.removeItem('access_token');
          toast.error('로그인 시간이 만료되었습니다.');
          navigate(`/`);
          setClear();
        });
    } else {
      setClear();
    }
  }, []);
}
