import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

import Profile from '../Profile';
import STYLES from '../../styles/const';

const withUserPageLayout = (WrappedComponent: any): React.ReactNode =>
  class WithUserPageLayout extends React.Component<{}, {}> {
    static async getInitialProps(ctx: any): Promise<any> {
      return (
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))
      );
    }

    render(): JSX.Element {
      return (
        <>
          <Head>
            <title>【TODO】ユーザ名が入るよ / teamO Twitter</title>
          </Head>
          <Header>
            <h2>【TODO】ユーザ名が入るよ</h2>
          </Header>
          <Body>
            <Profile />
            <WrappedComponent {...this.props} />
          </Body>
        </>
      );
    }
  };

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 53px;
  padding: 0 15px;
  border-bottom: solid 1px ${STYLES.COLOR.GRAY_LIGHTER_20};
  h2 {
    font-size: 19px;
    font-weight: 800;
  }
`;

const Body = styled.div`
  ul {
    li {
      border-bottom: solid 1px ${STYLES.COLOR.GRAY_LIGHTER_20};
    }
  }
`;

export default withUserPageLayout;
