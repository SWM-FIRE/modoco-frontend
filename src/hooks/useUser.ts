import { useQuery } from 'react-query';
import { getUser } from '../api/main';

const getAUser = async (senderUid: number) => {
  const { data } = await getUser(senderUid);
  return data;
};

export default function useUserInfo(senderUid: number) {
  return useQuery(['userData', 'getOne', senderUid], () => getAUser(senderUid));
}
