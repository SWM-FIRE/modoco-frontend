import { useQuery } from 'react-query';
import axios from 'axios';

const getRooms = async () => {
  const { data } = await axios.get('https://xn--hq1br4kwqt.com/api/v1/rooms');
  return data;
};

export default function useRooms() {
  return useQuery(['roomData', 'getAll'], getRooms);
}
