export default interface User {
  avatar: number;
  nickname: string;
  uid?: number;
}

export interface ConnectedUserInterface {
  nickname: string;
  uid: number;
  avatar: number;
  sid: string;
}
