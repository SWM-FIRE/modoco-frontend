import { useMutation } from 'react-query';
import axios from 'axios';
import { API } from '../../config';

const acceptFriend = async (uid: number) => {
  const { data } = await axios.put(
    API.FRIEND,
    {
      friend: uid,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  );
  return data;
};

export default function useAcceptFriendRequest(uid: number) {
  return useMutation(['friend', 'request'], () => acceptFriend(uid), {
    onSuccess: () => {
      console.log('Friend request sent');
    },
  });
}
