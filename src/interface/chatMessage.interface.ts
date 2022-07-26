export default interface chatMessage {
  room: string; // 방 아이디
  sender: string; // 보내는 사람 uid
  message: string;
  createdAt: string;
  prev: string;
}
