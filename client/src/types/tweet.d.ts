import { UserType } from './user';

export type TweetType = {
  id: number;
  content: string;
  tweetType: string;
  createdAt: number;
  user: UserType;
};

export type PostTweetType = {
  content: string;
  tweetType: string;
};
