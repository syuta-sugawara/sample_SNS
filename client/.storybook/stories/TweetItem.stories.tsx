import React from 'react';
import { storiesOf } from '@storybook/react';

import TweetItem from '../../src/components/TweetItem';
import { TweetType } from '../../src/types/tweet';

storiesOf('TweetItem', module).add('plain', () => {
  const tweet: TweetType = {
    id: 1,
    content:
      'ついっとついっとついっとついっとついっとついっとついっとついっとついっと',
    tweetType: 'tweet',
    user: {
      userID: 'junkisai',
      birthday: new Date('1995/01/22'),
      screenName: 'じゅんきち',
      iconURL:
        'https://pbs.twimg.com/profile_images/1195340954548363266/OeJ3BmJ2_400x400.jpg',
      followCount: 0,
      followedCount: 0,
    },
    createdAt: 1586758432,
  };
  return <TweetItem tweet={tweet} />;
});
