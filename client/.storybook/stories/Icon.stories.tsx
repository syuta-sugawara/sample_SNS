import React from 'react';
import { storiesOf } from '@storybook/react';

import CloseIcon from '../../src/components/icons/CloseIcon';
import HomeIcon from '../../src/components/icons/HomeIcon';
import LikeIcon from '../../src/components/icons/LikeIcon';
import NoticeIcon from '../../src/components/icons/NoticeIcon';
import RetweetIcon from '../../src/components/icons/RetweetIcon';
import TweetBtnIcon from '../../src/components/icons/TweetBtnIcon';
import TwitterIcon from '../../src/components/icons/TwitterIcon';

storiesOf('Icon', module)
  .add('close', () => {
    return <CloseIcon />;
  })
  .add('home', () => {
    return <HomeIcon />;
  })
  .add('like', () => {
    return <LikeIcon />;
  })
  .add('notice', () => {
    return <NoticeIcon />;
  })
  .add('retweet', () => {
    return <RetweetIcon />;
  })
  .add('tweet button', () => {
    return <TweetBtnIcon />;
  })
  .add('twitter', () => {
    return <TwitterIcon />;
  });
