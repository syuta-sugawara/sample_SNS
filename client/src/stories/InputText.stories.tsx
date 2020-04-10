import React from 'react';
import { storiesOf } from '@storybook/react';

import InputText from '../components/InputText';

storiesOf('InputText', module).add('plain', () => {
  return <InputText />;
});
