import { useQuery } from 'react-query';
import { getRooms } from '../api/main';

const getAllRooms = async () => {
  const { data } = await getRooms();
  return data;
};

export default function useRooms() {
  return useQuery(['roomData', 'getAll'], getAllRooms);
}
