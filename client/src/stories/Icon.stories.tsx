import React from 'react';
import { storiesOf } from '@storybook/react';

import CloseIcon from '../components/icons/CloseIcon';
import HomeIcon from '../components/icons/HomeIcon';
import LikeIcon from '../components/icons/LikeIcon';
import NoticeIcon from '../components/icons/NoticeIcon';
import RetweetIcon from '../components/icons/RetweetIcon';
import TweetBtnIcon from '../components/icons/TweetBtnIcon';
import TwitterIcon from '../components/icons/TwitterIcon';

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
