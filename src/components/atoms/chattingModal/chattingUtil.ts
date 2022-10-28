import chattingModalStore from 'src/stores/chattingModalStore';

export default function ChattingUtil() {
  const { openChattingModal, setChattingFriend } = chattingModalStore();
  const openChat = (friendUid: number) => {
    setChattingFriend(friendUid);
    openChattingModal();
  };

  return { openChat };
}
