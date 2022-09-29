import { useQuery } from 'react-query';
import axios from 'axios';
import { API } from '../../config';

const getAllFriends = async () => {
  const { data } = await axios.get(`${API.FRIEND}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
  return data;
};

export default function useFriends() {
  return useQuery(['Friend', 'all'], () => getAllFriends());
}
