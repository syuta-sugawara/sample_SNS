import { UserType } from './user';

export type TweetType = {
  id: number;
  content: string;
  tweetType: string;
  createdAt: number;
  user: UserType;
};
