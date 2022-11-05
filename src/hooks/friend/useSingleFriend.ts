import { useQuery } from 'react-query';
import { getFriend } from '../../api/main';

const getAFriend = async (uid: number) => {
  const { data } = await getFriend(uid);
  return data;
};

export default function useSingleFriend(
  uid: number,
  setIsFriend?,
  setIsPending?,
) {
  return useQuery(['friend', 'personal', uid], () => getAFriend(uid), {
    onSuccess: (data) => {
      if (setIsFriend) setIsFriend(data.status === 'ACCEPTED');
      if (setIsPending) setIsPending(data.status === 'PENDING');
    },
  });
}
