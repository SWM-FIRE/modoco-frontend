import User from './user.interface';

export default interface roomInterface {
  itemId: number;
  moderator: User;
  title: string;
  details?: number;
  id: string;
  current: string;
  total: string;
  theme: string;
}
