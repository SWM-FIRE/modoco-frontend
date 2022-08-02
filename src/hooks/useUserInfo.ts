import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../config';

const getUser = async (senderUid) => {
  const { data } = await axios.get((API.USER as string) + senderUid);
  return data;
};

export default function useUserInfo(senderUid) {
  return useQuery(['userData', 'getOne'], () => getUser(senderUid));
}
