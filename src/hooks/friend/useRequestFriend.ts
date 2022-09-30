import { useMutation } from 'react-query';
import { requestFriend } from '../../api/main';

const requestAFriend = async (uid: number) => {
  const { data } = await requestFriend(uid);
  return data;
};

export default function useRequestFriend(uid: number) {
  return useMutation(['friend', 'request'], () => requestAFriend(uid), {
    onSuccess: () => {
      console.log('Friend request sent');
    },
  });
}
