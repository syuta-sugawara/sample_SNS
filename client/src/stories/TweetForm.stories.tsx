import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import TweetForm from '../components/TweetForm';
import { UserType } from '../types/user';

storiesOf('TweetForm', module).add('plain', () => {
  const [value, setValue] = useState<string>('');
  const user: UserType = {
    userID: 'xxxxx',
    birthday: new Date('1995/01/22'),
    screenName: 'hoge',
    iconURL:
      'https://pbs.twimg.com/profile_images/1195340954548363266/OeJ3BmJ2_400x400.jpg',
    followCount: 0,
    followedCount: 0,
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(e.target.value);
  };
  const handleSubmit = (): void => {
    alert(`${value}とツイートする`);
  };
  const handleClose = (): void => {
    alert('onClose event is fire!');
  };

  return (
    <TweetForm
      user={user}
      value={value}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClose={handleClose}
    />
  );
});
