import { useQuery } from 'react-query';
import { getMeWithToken } from '../api/main';

const getUser = async () => {
  const { data } = await getMeWithToken(localStorage.getItem('access_token'));
  return data;
};

export default function useMe() {
  return useQuery(['userData', 'getOne'], () => getUser, { retry: 0 });
}
