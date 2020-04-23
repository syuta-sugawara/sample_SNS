import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import withLayout from '../../../components/Layout/';
import UserPageLayout from '../../../components/Layout/UserPage';
import TweetItem from '../../../components/TweetItem';
import { RootState } from '../../../store';
import { fetchUser, fetchUserTweets } from '../../../store/user/actions';
import { TweetType } from '../../../types/tweet';

const User: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const tweets = useSelector((state: RootState) => state.user.tweets);
  const uid = router.query.uid as string;

  useEffect(() => {
    dispatch(fetchUser(uid));
    dispatch(fetchUserTweets(uid));
  }, []);

  return (
    <UserPageLayout>
      <ul>
        {tweets.map((item: TweetType) => (
          <li key={item.id}>
            <TweetItem tweet={item} />
          </li>
        ))}
      </ul>
    </UserPageLayout>
  );
};

export default withLayout(User);
