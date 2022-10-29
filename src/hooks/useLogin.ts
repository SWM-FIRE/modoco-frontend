import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import mainModalStore from '../stores/mainModalStore';
import userStore from '../stores/userStore';
import { login, getMe } from '../api/main';

export default function useLogin() {
  const navigate = useNavigate();
  const { setNickname, setAvatar, setUid } = userStore();
  const { closeLoginModal, openLoginModal } = mainModalStore();
  const [inputs, setInputs] = useState({
    email: localStorage.getItem('email') ?? '',
    password: '',
  });
  const { email, password } = inputs;
  const [isError, setIsError] = useState(false);

  const onChange = (e) => {
    setIsError(false);
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const isDisable = () => {
    if (email === '' || password === '') return true;
    return false;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then((result) => {
        localStorage.setItem('email', inputs.email);
        localStorage.setItem('access_token', result.data.access_token);
        getMe()
          .then((res) => {
            // reload to resolve socket bog
            window.location.reload();
            setNickname(res.data.nickname);
            setAvatar(res.data.avatar);
            setUid(res.data.uid);
            toast.success('로그인이 완료되었습니다');
            navigate(`/main`);
          })
          .catch((err) => {
            if (err.response.status === 403) {
              toast.error('이메일 인증을 완료해주세요');
            }
            localStorage.removeItem('access_token');
          });
        closeLoginModal();
      })
      .catch((err) => {
        console.log('[error]', err.response.data.message);
        setIsError(true);
        openLoginModal();
      });
  };

  return {
    inputs,
    onChange,
    onSubmit,
    isDisable,
    isError,
  };
}
