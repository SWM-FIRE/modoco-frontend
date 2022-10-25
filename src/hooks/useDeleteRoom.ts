import { useMutation, useQueryClient } from 'react-query';
import { deleteRoom } from '../api/main';

const deleteARoom = async (room: number) => {
  const { data } = await deleteRoom(room);
  return data;
};

export default function useDeleteRoom(room: number) {
  const queryClient = useQueryClient();
  return useMutation(['room', 'delete', room], () => deleteARoom(room), {
    onSettled: () => {
      queryClient.invalidateQueries(['roomData', 'getAll']);
    },
  });
}
