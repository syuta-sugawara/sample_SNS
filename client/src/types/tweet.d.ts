import { UserType } from './user';

export type TweetType = {
  id: number;
  content: string;
  tweetType: string;
  user: UserType;
  createdAt: number;
};
