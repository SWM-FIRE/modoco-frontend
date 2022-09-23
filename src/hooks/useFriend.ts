import axios from 'axios';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { API } from '../config';

const useFriendRequest = (friendUid: number) => {
  const mutation = useMutation(
    () =>
      axios.post(
        API.FRIEND,
        {
          friend: friendUid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        },
      ),

    {
      onSuccess: () => {
        toast.success('친구 신청이 완료되었습니다.');
      },
    },
  );
  return mutation;
};

export { useFriendRequest };
