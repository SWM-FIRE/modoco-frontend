import { useSearchParams, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { useEffect } from 'react';

export default function Auth() {
  const [token] = useSearchParams();
  const accessToken = token.get('access_token');
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      toast.success('로그인이 완료되었습니다');
      navigate('/');
    }
  });
  return <Toaster />;
}
