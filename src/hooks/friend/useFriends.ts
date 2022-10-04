import { useQuery } from 'react-query';
import { getAllFriends } from '../../api/main';

const getFriends = async () => {
  const { data } = await getAllFriends();
  return data;
};

export default function useFriends() {
  return useQuery(['Friend', 'all'], () => getFriends());
}
