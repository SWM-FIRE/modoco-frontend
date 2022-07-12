import User from './user.interface';

export default interface blockInterface {
  itemId: number;
  moderator: User;
  title: string;
  detail?: string;
  tags: string[];
  current: number;
  total: number;
}
