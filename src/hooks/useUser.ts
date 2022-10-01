import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../config';

const getUser = async (senderUid: string) => {
  const { data } = await axios.get((API.USER as string) + senderUid, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
  return data;
};

export default function useUser(senderUid: string) {
  return useQuery(['userData', 'getOne'], () => getUser(senderUid), {
    cacheTime: 0,
  });
}
