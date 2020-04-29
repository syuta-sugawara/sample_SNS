import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import Login from '../../src/components/Login';

const Wrapper = styled.div`
  display: inline-block;
  border: solid 1px #ccc;
`;

storiesOf('Login', module)
  .add('plain', () => {
    return (
      <Wrapper>
        <Login /> 
      </Wrapper>
    );
  });
