import { useMutation } from 'react-query';
import axios from 'axios';
import { API } from '../../config';

const requestFriend = async (uid: number) => {
  const { data } = await axios.post(
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

export default function useRequestFriend(uid: number) {
  return useMutation(['friend', 'request'], () => requestFriend(uid), {
    onSuccess: () => {
      console.log('Friend request sent');
    },
  });
}
