import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { requestFriend } from '../api/main';

const useFriendRequest = (friendUid: number) => {
  const mutation = useMutation(() => requestFriend(friendUid), {
    onSuccess: () => {
      toast.success('친구 신청이 완료되었습니다.');
    },
  });
  return mutation;
};

export { useFriendRequest };
