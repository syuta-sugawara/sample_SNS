import { UserType } from './user';

export type TweetType = {
  id: number;
  content: string;
  tweetType: string;
  createdAt: number;
  likeCount?: number;
  likeUsers?: string[];
  refTweet?: TweetType;
  refTweetID?: number;
  retweetCount?: number;
  retweetUsers?: string[];
  user: UserType;
};

export type PostTweetType = {
  content: string;
  tweetType: string;
};
