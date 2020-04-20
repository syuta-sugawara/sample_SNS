import Head from 'next/head';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Profile from '../Profile';
import STYLES from '../../styles/const';
import { RootState } from '../../store';

type Props = {
  children: React.ReactNode;
};

const UserPageLayout: React.FC<Props> = props => {
  const myself = useSelector((state: RootState) => state.myself);
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <Head>
        <title>{`${user.screenName} / teamO Twitter`}</title>
      </Head>
      <Header>
        <h2>{user.screenName}</h2>
      </Header>
      <Body>
        <Profile isMine={user.id === myself.id} />
        {props.children}
      </Body>
    </>
  );
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

export default UserPageLayout;
