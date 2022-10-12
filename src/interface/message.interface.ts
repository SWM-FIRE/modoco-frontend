// export default interface messageInterface {
//   user: User;
//   msg: string;
//   time: string;
//   type: string;
//   isHideTime: boolean;
//   isHideNicknameAndAvatar: boolean;
// }

export default interface MessageInterface {
  uid: number;
  nickname: string;
  avatar: number;
  message: string;
  createdAt: string;
  type: string; // 'MESSAGE' || 'JOIN' || 'LEAVE' || 'CODE'
  isHideTime: boolean;
  isHideNicknameAndAvatar: boolean;
}
