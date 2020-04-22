import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import withLayout from '../components/Layout/';
import TweetItem from '../components/TweetItem';
import { fetchTweetList } from '../store/tweet/actions';
import { RootState } from '../store';
import STYLES from '../styles/const';
import { TweetType } from '../types/tweet';

const Home: NextPage = () => {
  const tweetList = useSelector((state: RootState) => state.tweet.results);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchTweetList());
  }, []);

  return (
    <>
      <Head>
        <title>ホーム / teamO Twitter</title>
      </Head>
      <Header>
        <h2>ホーム</h2>
      </Header>
      <Separator />
      <Body>
        <ul>
          {tweetList.map((item: TweetType) => (
            <li key={item.id}>
              <TweetItem tweet={item} />
            </li>
          ))}
        </ul>
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

const Separator = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${STYLES.COLOR.GRAY_LIGHTER_20};
`;

const Body = styled.div`
  ul {
    li {
      border-bottom: solid 1px ${STYLES.COLOR.GRAY_LIGHTER_20};
    }
  }
`;

export default withLayout(Home);
