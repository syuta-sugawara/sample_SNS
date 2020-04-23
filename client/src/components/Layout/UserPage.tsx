import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const { pathname } = router;
  const uid = router.query.uid;

  return (
    <>
      <Head>
        <title>{`${user.screenName} / teamO Twitter`}</title>
      </Head>
      <Header>
        <h2>{user.screenName}</h2>
      </Header>
      <Body>
        <Profile user={user} isMine={user.id === myself.id} />
        <TabList>
          <TabItem primary={pathname === '/users/[uid]'}>
            <Link href="/users/[uid]" as={`/users/${uid}`}>
              <a>ツイート</a>
            </Link>
          </TabItem>
          <TabItem primary={pathname === '/users/[uid]/likes'}>
            <Link href="/users/[uid]/likes" as={`/users/${uid}/likes`}>
              <a>いいね</a>
            </Link>
          </TabItem>
        </TabList>
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

const TabList = styled.nav`
  display: flex;
`;

type TabItemProps = {
  primary?: boolean;
};

const TabItem = styled.div`
  position: relative;
  flex: 1;
  height: 60px;
  font-size: 18px;
  border-bottom-color: ${(props: TabItemProps): string =>
    !props.primary ? STYLES.COLOR.GRAY_LIGHTER_20 : STYLES.COLOR.PRIMARY};
  border-bottom-style: solid;
  border-bottom-width: ${(props: TabItemProps): string =>
    !props.primary ? '1px' : '2px'};
  a {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: ${(props: TabItemProps): string =>
      !props.primary ? STYLES.COLOR.GRAY : STYLES.COLOR.PRIMARY};
    text-decoration: none;
  }
  &:hover {
    cursor: pointer;
    background-color: ${STYLES.COLOR.PRIMARY_LIGHTER_30};
    a {
      color: ${STYLES.COLOR.PRIMARY};
    }
  }
`;

export default UserPageLayout;
