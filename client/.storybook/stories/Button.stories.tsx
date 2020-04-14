import React from 'react';
import { storiesOf } from '@storybook/react';

import Button, { Variant } from '../../src/components/Button';
import HomeIcon from '../../src/components/icons/HomeIcon';
import NoticeIcon from '../../src/components/icons/NoticeIcon';
import TwitterIcon from '../../src/components/icons/TwitterIcon';

const handleClick = (): void => {
  console.log('click event is fire');
};

storiesOf('Button/contained', module)
  .add('plain', () => {
    return (
      <Button
        text="ツイートする"
        variant={Variant.CONTAINED}
        onClick={handleClick}
      />
    );
  })
  .add('disabled', () => {
    return (
      <Button
        text="ツイートする"
        variant={Variant.CONTAINED}
        disabled
        onClick={handleClick}
      />
    );
  })
  .add('with icon', () => {
    return (
      <Button
        text="ツイートする"
        variant={Variant.CONTAINED}
        icon={<TwitterIcon />}
        onClick={handleClick}
      />
    );
  });

storiesOf('Button/outlined', module)
  .add('plain', () => {
    return (
      <Button
        text="ツイートする"
        variant={Variant.OUTLINED}
        onClick={handleClick}
      />
    );
  })
  .add('disabled', () => {
    return (
      <Button
        text="ツイートする"
        variant={Variant.OUTLINED}
        disabled
        onClick={handleClick}
      />
    );
  })
  .add('with icon', () => {
    return (
      <Button
        text="ツイートする"
        variant={Variant.OUTLINED}
        icon={<HomeIcon />}
        onClick={handleClick}
      />
    );
  });

storiesOf('Button/text', module)
  .add('plain', () => {
    return (
      <Button
        text="ツイートする"
        variant={Variant.TEXT}
        onClick={handleClick}
      />
    );
  })
  .add('disabled', () => {
    return (
      <Button
        text="ツイートする"
        variant={Variant.TEXT}
        disabled
        onClick={handleClick}
      />
    );
  })
  .add('with icon', () => {
    return (
      <Button
        text="ツイートする"
        variant={Variant.TEXT}
        icon={<NoticeIcon />}
        onClick={handleClick}
      />
    );
  });
