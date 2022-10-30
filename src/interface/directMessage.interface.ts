export interface message {
  from: number;
  to: number;
  message: string;
  createdAt: string;
}

export interface connection {
  uid: number;
  nickname: string;
  connection: 'offline' | 'online';
}

export interface newMessageInterface {
  to: number;
  from: number;
  message: string;
  createdAt: string;
  isHide: boolean;
  hideTime: boolean;
}

interface friend {
  uid: number;
  name: string;
  email: string;
  avatar: number;
}

export default interface directMessage {
  friend: friend;
  connection: 'offline' | 'online';
  messages: message[];
}
