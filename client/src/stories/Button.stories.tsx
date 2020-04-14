import React from 'react';
import { storiesOf } from '@storybook/react';

import Button, { Variant } from '../components/Button';
import HomeIcon from '../components/icons/HomeIcon';
import NoticeIcon from '../components/icons/NoticeIcon';
import TwitterIcon from '../components/icons/TwitterIcon';

storiesOf('Button/contained', module)
  .add('plain', () => {
    return <Button text="ツイートする" variant={Variant.CONTAINED} />;
  })
  .add('disabled', () => {
    return <Button text="ツイートする" variant={Variant.CONTAINED} disabled />;
  })
  .add('with icon', () => {
    return (
      <Button
        text="ツイートする"
        variant={Variant.CONTAINED}
        icon={<TwitterIcon />}
      />
    );
  });

storiesOf('Button/outlined', module)
  .add('plain', () => {
    return <Button text="ツイートする" variant={Variant.OUTLINED} />;
  })
  .add('disabled', () => {
    return <Button text="ツイートする" variant={Variant.OUTLINED} disabled />;
  })
  .add('with icon', () => {
    return (
      <Button
        text="ツイートする"
        variant={Variant.OUTLINED}
        icon={<HomeIcon />}
      />
    );
  });

storiesOf('Button/text', module)
  .add('plain', () => {
    return <Button text="ツイートする" variant={Variant.TEXT} />;
  })
  .add('disabled', () => {
    return <Button text="ツイートする" variant={Variant.TEXT} disabled />;
  })
  .add('with icon', () => {
    return (
      <Button
        text="ツイートする"
        variant={Variant.TEXT}
        icon={<NoticeIcon />}
      />
    );
  });
