import { useMutation } from 'react-query';
import { acceptFriend } from '../../api/main';

const acceptAFriend = async (uid: number) => {
  const { data } = await acceptFriend(uid);
  return data;
};

export default function useAcceptFriendRequest(uid: number) {
  return useMutation(['friend', 'request'], () => acceptAFriend(uid), {
    onSuccess: () => {
      console.log('Friend request sent');
    },
  });
}
