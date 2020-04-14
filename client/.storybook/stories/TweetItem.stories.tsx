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
      id: 'junkisai',
      screenName: 'じゅんきち',
      iconUrl:
        'https://pbs.twimg.com/profile_images/1195340954548363266/OeJ3BmJ2_400x400.jpg',
    },
    createdAt: 1586758432,
  };
  return <TweetItem tweet={tweet} />;
});
