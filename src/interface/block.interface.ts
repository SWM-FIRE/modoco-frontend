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
  // string으로 받지만 사용시에 parse하여 사용
  createdAt: string;
  theme: string;
  isPublic: boolean;
}
