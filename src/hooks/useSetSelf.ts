import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UserStore from '../stores/userStore';
import { getMeWithToken, getRecords } from '../api/main';

const useSetSelf = () => {
  const { setNickname, setAvatar, setUid, setClear, setTime, setLogin, uid } =
    UserStore();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (uid !== -1) {
      setLogin(true);
      return;
    }
    if (token) {
      getMeWithToken(localStorage.getItem('access_token'))
        .then((res) => {
          setNickname(res.data.nickname);
          setAvatar(res.data.avatar);
          setUid(res.data.uid);
          getRecords().then((res) => {
            if (res.data.length !== 0) {
              setTime(Number(res.data[0].duration) * 60);
            }
            setLogin(true);
          });
        })
        .catch(() => {
          if (localStorage.getItem('access_token')) {
            toast.error('로그인 시간이 만료되었습니다.');
            localStorage.removeItem('access_token');
          }
          navigate(`/`);
          setClear();
          setLogin(true);
        });
    } else {
      setClear();
      setLogin(true);
    }
  }, []);
};

export default useSetSelf;
