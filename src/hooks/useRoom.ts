import { useQuery } from 'react-query';
import { getRoom } from '../api/main';

const getARoom = async (roomId: string) => {
  const { data } = await getRoom(roomId);
  return data;
};
export default function useRoom(roomId: string) {
  return useQuery(['roomData', 'getOne'], () => getARoom(roomId));
}
