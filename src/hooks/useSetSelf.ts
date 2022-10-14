import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UserStore from '../stores/userStore';
import { getMe } from '../api/main';

const useSetSelf = () => {
  const { setNickname, setAvatar, setUid, setClear, setLogin, uid } =
    UserStore();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (uid !== -1) {
      setLogin(true);
      return;
    }
    if (token) {
      getMe()
        .then((res) => {
          setNickname(res.data.nickname);
          setAvatar(res.data.avatar);
          setUid(res.data.uid);
          // getRecords().then((res) => {
          //   if (res.data.length !== 0) {
          //     setTime(Number(res.data[0].duration) * 60);
          //   }
          // });
          setLogin(true);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            toast.error('이메일 인증을 완료해주세요.');
          } else if (localStorage.getItem('access_token')) {
            toast.error('로그인 시간이 만료되었습니다.');
          }
          localStorage.removeItem('access_token');
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
