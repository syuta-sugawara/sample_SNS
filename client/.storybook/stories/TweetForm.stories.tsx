import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import TweetForm from '../../src/components/TweetForm';
import { UserType } from '../../src/types/user';

storiesOf('TweetForm', module).add('plain', () => {
  const [value, setValue] = useState<string>('');
  const user: UserType = {
    id: 'xxxxx',
    screenName: 'hoge',
    iconURL:
      'https://pbs.twimg.com/profile_images/1195340954548363266/OeJ3BmJ2_400x400.jpg',
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
