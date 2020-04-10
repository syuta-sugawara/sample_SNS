import { configure, addDecorator } from '@storybook/react';
import { createGlobalStyle } from 'styled-components';

import reset from '../src/styles/reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

configure(require.context('../src/stories', true, /\.stories\.tsx?$/), module);
addDecorator(s => <><GlobalStyle />{s()}</>);
