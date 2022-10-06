import blockInterface from '../../interface/block.interface';
import userStore from '../../stores/userStore';

export const filterMyData = (data) => {
  const { uid } = userStore();
  const newData = data?.filter(
    (block: blockInterface) => block.moderator.uid === uid,
  );

  newData?.sort((a, b) => {
    if (a.itemId > b.itemId) {
      return 1;
    }
    if (a.itemId < b.itemId) {
      return -1;
    }
    return 0;
  });
  return newData;
};
