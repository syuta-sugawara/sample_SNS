import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import InputText from '../../src/components/InputText';

storiesOf('InputText', module)
  .add('plain', () => {
    const [value, setValue] = useState<string>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setValue(e.target.value);
    };

    return (
      <InputText
        label="ユーザID"
        placeholder="ユーザIDを追加"
        value={value}
        onChange={handleChange}
      />
    );
  })
  .add('with limit', () => {
    const [value, setValue] = useState<string>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setValue(e.target.value);
    };

    return (
      <InputText
        label="ユーザID"
        placeholder="ユーザIDを追加"
        value={value}
        limit={50}
        onChange={handleChange}
      />
    );
  });
