import { useQuery } from 'react-query';
import axios from 'axios';

const getUser = async (senderUid) => {
  const { data } = await axios.get(
    (process.env.REACT_APP_GET_USER_INFO as string) + senderUid,
  );
  return data;
};

export default function useUserInfo(senderUid) {
  return useQuery(['userData', 'getOne'], () => getUser(senderUid));
}
