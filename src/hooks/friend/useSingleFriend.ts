import { useQuery } from 'react-query';
import { getFriend } from '../../api/main';

const getAFriend = async (uid: number) => {
  const { data } = await getFriend(uid);
  return data;
};

export default function useSingleFriend(uid: number) {
  return useQuery(['Friend', 'personal', uid], () => getAFriend(uid));
}
