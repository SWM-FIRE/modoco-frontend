import { useMutation } from 'react-query';
import axios from 'axios';
import { API } from '../../config';

const deleteFriend = async (uid: number) => {
  const { data } = await axios.delete(API.FRIEND, {
    data: {
      friend: uid,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
  return data;
};

export default function useDeleteFriendRequest(uid: number) {
  return useMutation(['friend', 'request'], () => deleteFriend(uid), {
    onSuccess: () => {
      console.log('Friend request sent');
    },
  });
}
