import User from './user.interface';

export default interface blockInterface {
  // isMain: boolean;
  itemId: number;
  moderator: User;
  title: string;
  details?: string;
  tags: string[];
  current: number;
  total: number;
  theme: string;
  isPublic: boolean;
}
