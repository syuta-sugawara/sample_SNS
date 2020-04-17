import React from 'react';
import styled from 'styled-components';

import Modal from '../../components/Modal';
import STYLES from '../../styles/const';
import Navigation from '../Navigation';

const withLayout = (WrappedComponent: any): any =>
  class WithLayout extends React.Component<{}, {}> {
    static async getInitialProps(ctx: any): Promise<any> {
      return (
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))
      );
    }

    render(): JSX.Element {
      return (
        <>
          <Modal />
          <App>
            <Header>
              <Navigation />
            </Header>
            <Main>
              <WrappedComponent {...this.props} />
            </Main>
          </App>
        </>
      );
    }
  };

const App = styled.div`
  display: flex;
  justify-content: center;
`;

const Header = styled.header``;

const Main = styled.main`
  width: 100%;
  border-right: solid 1px ${STYLES.COLOR.GRAY_LIGHTER_20};
  border-left: solid 1px ${STYLES.COLOR.GRAY_LIGHTER_20};
  @media ${STYLES.DEVICE.MOBILE} {
    width: 600px;
  }
`;

export default withLayout;
