import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import Signup from '../../src/components/Signup';

const Wrapper = styled.div`
  display: inline-block;
  border: solid 1px #ccc;
`;

storiesOf('Signup', module)
  .add('plain', () => {
    return (
      <Wrapper>
        <Signup /> 
      </Wrapper>
    );
  });
