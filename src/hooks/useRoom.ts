import { useQuery } from 'react-query';
import axios from 'axios';
import { API } from '../config';

const getRoom = async (roomId: string) => {
  const { data } = await axios.get(`${API.ROOM}${roomId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
  return data;
};

export default function useRoom(roomId: string) {
  return useQuery(['roomData', 'getOne'], () => getRoom(roomId));
}
