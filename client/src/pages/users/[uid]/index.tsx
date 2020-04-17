import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';

import withLayout from '../../../components/Layout/';
import withUserPageLayout from '../../../components/Layout/UserPage';
import TweetItem from '../../../components/TweetItem';
import STYLES from '../../../styles/const';
import { RootState } from '../../../store';
import { fetchTweetList } from '../../../store/tweet/actions';
import { TweetType } from '../../../types/tweet';

const User: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const tweetList = useSelector((state: RootState) => state.tweet.results);
  const uid = 'dummy';
  console.log(router.query.uid);
  useEffect(() => {
    dispatch(fetchTweetList());
  }, []);

  return (
    <>
      <TabList>
        <TabItem primary>
          <Link href="/users/[uid]" as={`/users/${uid}`}>
            <a>ツイート</a>
          </Link>
        </TabItem>
        <TabItem>
          <Link href="/users/[uid]/likes" as={`/users/${uid}/likes`}>
            <a>いいね</a>
          </Link>
        </TabItem>
      </TabList>
      <ul>
        {tweetList.map((item: TweetType) => (
          <li key={item.id}>
            <TweetItem tweet={item} />
          </li>
        ))}
      </ul>
    </>
  );
};

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

export default withLayout(withUserPageLayout(User));
