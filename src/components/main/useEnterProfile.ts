import { useNavigate } from 'react-router-dom';
import userStore from 'src/stores/userStore';
import { toast } from 'react-hot-toast';

const useEnterProfile = (uid: number) => {
  const navigate = useNavigate();
  const { uid: myUid } = userStore();

  const enterProfile = () => {
    if (myUid) {
      navigate(`/profile/${uid}`);
      window.scrollTo(0, 0);
    } else {
      toast.error('로그인이 필요한 서비스입니다.');
    }
  };
  return {
    enterProfile,
  };
};

export default useEnterProfile;
