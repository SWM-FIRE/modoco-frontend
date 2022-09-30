import { useMutation } from 'react-query';
import { deleteFriend } from '../../api/main';

const deleteAFriend = async (uid: number) => {
  const { data } = await deleteFriend(uid);
  return data;
};

export default function useDeleteFriendRequest(uid: number) {
  return useMutation(['friend', 'request'], () => deleteAFriend(uid), {
    onSuccess: () => {
      console.log('Friend request sent');
    },
  });
}
