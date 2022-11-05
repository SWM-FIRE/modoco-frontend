import { useQuery } from 'react-query';
import { getAllFriends } from '../../api/main';
import { detailedFriend } from '../../interface/singleFriend.interface';

const getFriends = async () => {
  const { data } = await getAllFriends();
  return data;
};

export default function useFriends(
  setAcceptedFriends,
  setPendingSendFriends,
  setPendingRecvFriends,
) {
  return useQuery(['friend'], () => getFriends(), {
    onSuccess: (data) => {
      setAcceptedFriends(
        data
          ?.filter((friend: detailedFriend) => friend.status === 'ACCEPTED')
          .map((friend: detailedFriend) => friend.sender || friend.receiver),
      );
      setPendingSendFriends(
        data
          ?.filter(
            (friend: detailedFriend) =>
              friend.status === 'PENDING' && friend.role === 'SENDER',
          )
          .map((friend: detailedFriend) => friend.receiver),
      );
      setPendingRecvFriends(
        data
          ?.filter(
            (friend: detailedFriend) =>
              friend.status === 'PENDING' && friend.role === 'RECEIVER',
          )
          .map((friend: detailedFriend) => friend.sender),
      );
    },
  });
}
