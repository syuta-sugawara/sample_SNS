export type UserType = {
  userID: string;
  birthday: Date;
  screenName: string;
  iconURL: string;
  followCount: number;
  followedCount: number;
  tweet?: {
    tweetID: string;
    content: string;
    tweetType: string;
    refTweetID?: string;
    createdAt: Date;
    likes?: string[][];
  }[];
};
