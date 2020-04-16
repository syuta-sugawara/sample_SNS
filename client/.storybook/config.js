import { configure, addDecorator } from '@storybook/react';
import { createGlobalStyle } from 'styled-components';

import reset from '../src/styles/reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: Arial, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka, メイリオ, Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
  }
`;

configure(require.context('./stories', true, /\.stories\.tsx?$/), module);
addDecorator(s => <><GlobalStyle />{s()}</>);
