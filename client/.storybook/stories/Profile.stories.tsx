import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import Profile from '../../src/components/Profile';

const Wrapper = styled.div`
  display: inline-block;
  width: 600px;
  border: solid 1px #ccc;
`;

storiesOf('Profile', module).add('plain', () => {
  return (
    <Wrapper>
      <Profile />
    </Wrapper>
  );
});
