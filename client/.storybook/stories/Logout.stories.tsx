import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Logout from '../../src/components/Logout';

storiesOf('Logout', module).add('logout', () => {
  return <Logout />;
});
