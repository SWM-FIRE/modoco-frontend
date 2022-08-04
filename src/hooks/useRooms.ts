import { useQuery } from 'react-query';
import axios from 'axios';
import { API } from '../config';

const getRooms = async () => {
  const { data } = await axios.get(API.ROOM);
  return data;
};

export default function useRooms() {
  return useQuery(['roomData', 'getAll'], getRooms);
}
