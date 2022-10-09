import { useQuery } from 'react-query';
import { getMe } from '../api/main';

const getUser = async () => {
  const { data } = await getMe();
  return data;
};

export default function useMe() {
  return useQuery(['userData', 'getOne', 'me'], () => getUser, { retry: 0 });
}
