import React from 'react';
import App from 'next/app';
import { createGlobalStyle } from 'styled-components';

import reset from '../styles/reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

export default class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    );
  }
}
