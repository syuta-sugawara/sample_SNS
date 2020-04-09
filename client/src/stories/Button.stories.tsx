import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../components/Button';

storiesOf('Button', module)
  .add('blue', () => {
    return <Button text="Click Me" color="blue" />;
  })
  .add('red', () => {
    return <Button text="Click Me" color="red" />;
  });
