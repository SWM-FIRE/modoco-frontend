import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../config';

const getUser = async (token: string) => {
  const { data } = await axios.get(API.ME, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export default function useMe(token: string) {
  return useQuery(['userData', 'getOne'], () => getUser(token), { retry: 0 });
}
