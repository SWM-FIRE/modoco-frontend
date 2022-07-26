import User from './user.interface';

export default interface messageInterface {
  user: User;
  msg: string;
  time: string;
  prev: string;
}
