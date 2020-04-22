export const ActionTypes = {
  getTweetList: 'GET_TWEET_LIST',
  postTweet: 'POST_TWEET',
  showModal: 'SHOW_MODAL',
  hideModal: 'HIDE_MODAL',
  setMyself: 'SET_MYSELF',
  getUser: 'GET_USER',
  getUserTweets: 'GET_USER_TWEETS',
  getTokenFromLocal: 'GET_TOKEN_FROM_LOCAL',
  getTokenFromRemote: 'GET_TOKEN_FROM_REMOTE',
  execSignup: 'EXEC_SIGNUP',
  execSignin: 'EXEC_SIGNIN',
  execSignout: 'EXEC_SIGNOUT',
} as const;
