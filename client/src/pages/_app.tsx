import App, { AppContext, AppInitialProps } from 'next/app';
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper';
import React from 'react';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import store from '../store';
import reset from '../styles/reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

class MyApp extends App<ReduxWrapperAppProps> {
  static async getInitialProps({
    Component,
    ctx,
  }: AppContext): Promise<AppInitialProps> {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  render(): JSX.Element {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <GlobalStyle />
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(store)(MyApp);
