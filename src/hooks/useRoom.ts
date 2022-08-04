import { useQuery } from 'react-query';
import axios from 'axios';
import { API } from '../config';

const getRoom = async (roomId) => {
  const { data } = await axios.get(`${API.ROOM}${roomId}`);
  return data;
};

export default function useRoom(roomId) {
  return useQuery(['roomData', 'getOne'], () => getRoom(roomId));
}
