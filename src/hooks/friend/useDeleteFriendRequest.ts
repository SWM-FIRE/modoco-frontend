import { useMutation, useQueryClient } from 'react-query';
import { deleteFriend } from '../../api/main';

const deleteAFriend = async (uid: number) => {
  const { data } = await deleteFriend(uid);
  return data;
};

export default function useDeleteFriendRequest(uid: number) {
  const queryClient = useQueryClient();
  return useMutation(['friend', 'request'], () => deleteAFriend(uid), {
    onSettled: () => {
      queryClient.invalidateQueries(['Friend', 'personal']);
    },
  });
}
