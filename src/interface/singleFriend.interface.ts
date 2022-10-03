export default interface singleFriend {
  uid: number;
  nickname: string;
  email: string;
  avatar: number;
}

export interface detailedFriend {
  status: 'ACCEPTED' | 'PENDING';
  role: 'SENDER' | 'RECEIVER';
  receiver?: singleFriend;
  sender?: singleFriend;
}
