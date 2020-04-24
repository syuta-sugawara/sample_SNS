import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import ProfileEdit from '../../src/components/ProfileEdit';

const Wrapper = styled.div`
  display: inline-block;
  width: 600px;
  border: solid 1px #ccc;
  border-radius: 12px;
`;

storiesOf('ProfileEdit', module)
  .add('自分', () => {
    const handleClose = () => {
      console.log('close');
    };

    return (
      <Wrapper>
        <ProfileEdit onClose={handleClose} />
      </Wrapper>
    );
  });
