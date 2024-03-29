import { useMutation, useQueryClient } from 'react-query';
import { requestFriend } from '../../api/main';

const requestAFriend = async (uid: number) => {
  const { data } = await requestFriend(uid);
  return data;
};

export default function useRequestFriend(uid: number) {
  const queryClient = useQueryClient();
  return useMutation(['friend', 'request', uid], () => requestAFriend(uid), {
    onSuccess: () => {
      queryClient.invalidateQueries(['friend', 'personal', uid]);
      queryClient.invalidateQueries(['friend']);
    },
  });
}
