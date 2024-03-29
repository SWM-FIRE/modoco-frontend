import { useMutation, useQueryClient } from 'react-query';
import { acceptFriend } from '../../api/main';

const acceptAFriend = async (uid: number) => {
  const { data } = await acceptFriend(uid);
  return data;
};

export default function useAcceptFriendRequest(uid: number) {
  const queryClient = useQueryClient();
  return useMutation(['friend', 'request', uid], () => acceptAFriend(uid), {
    onSuccess: () => {
      queryClient.invalidateQueries(['friend', 'personal', uid]);
      queryClient.invalidateQueries(['friend']);
    },
  });
}
