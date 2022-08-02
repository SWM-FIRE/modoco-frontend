import { useQuery } from 'react-query';
import axios from 'axios';

const getRoom = async (roomId) => {
  const { data } = await axios.get(
    `https://xn--hq1br4kwqt.com/api/v1/rooms/${roomId}`,
  );
  return data;
};

export default function useRoom(roomId) {
  return useQuery(['roomData', 'getOne'], () => getRoom(roomId));
}
