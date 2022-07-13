import User from './user.interface';

export default interface blockInterface {
  itemId: number;
  moderator: User;
  title: string;
  details?: string;
  tags: string[];
  current: number;
  total: number;
}
