import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import InputText from '../components/InputText';

storiesOf('InputText', module).add('plain', () => {
  const [value, setValue] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return <InputText label="ユーザID" value={value} onChange={handleChange} />;
});
