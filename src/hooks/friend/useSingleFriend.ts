import { useQuery } from 'react-query';
import axios from 'axios';
import { API } from '../../config';

const getFriend = async (uid: number) => {
  const { data } = await axios.get(`${API.FRIEND}`, {
    params: { friend: uid },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
  return data;
};

export default function useSingleFriend(uid: number) {
  return useQuery(['Friend', 'personal'], () => getFriend(uid));
}
