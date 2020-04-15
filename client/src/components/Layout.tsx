import React from 'react';
import styled from 'styled-components';

import STYLES from '../styles/const';
import Navigation from './Navigation';

export const withLayout = (WrappedComponent: any): any =>
  class WithLayout extends React.Component<{}, {}> {
    static async getInitialProps(ctx: any): Promise<any> {
      return (
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))
      );
    }

    render(): JSX.Element {
      return (
        <Wrapper>
          <Header>
            <Navigation />
          </Header>
          <Main>
            <WrappedComponent {...this.props} />
          </Main>
        </Wrapper>
      );
    }
  };

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Header = styled.header``;

const Main = styled.main`
  width: 600px;
  border-right: solid 1px ${STYLES.COLOR.GRAY_LIGHTER_20};
  border-left: solid 1px ${STYLES.COLOR.GRAY_LIGHTER_20};
  @media ${STYLES.DEVICE.MOBILE} {
    width: 100%;
  }
`;

export default withLayout;
