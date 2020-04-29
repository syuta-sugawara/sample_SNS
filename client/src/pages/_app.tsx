import App, { AppContext, AppInitialProps } from 'next/app';
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper';
import React from 'react';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import Auth from '../components/Auth';
import store from '../store';
import reset from '../styles/reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: Arial, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka, メイリオ, Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
  }
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
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </Provider>
    );
  }
}

export default withRedux(store)(MyApp);
