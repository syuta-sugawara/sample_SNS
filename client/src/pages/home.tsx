import { NextPage } from 'next';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Navigation from '../components/Navigation';
import TweetItem from '../components/TweetItem';
import { fetchTweetList } from '../store/tweet/actions';
import { RootState } from '../store';
import STYLES from '../styles/const';
import { TweetType } from '../types/tweet';

const Home: NextPage = () => {
  const tweetList = useSelector((state: RootState) => state.tweet.results);
  return (
    <Wrapper>
      <Header>
        <Navigation />
      </Header>
      <Main>
        <MainHeader>
          <h2>ホーム</h2>
        </MainHeader>
        <MainBody>
          <ul>
            {tweetList.map((item: TweetType) => (
              <li key={item.id}>
                <TweetItem tweet={item} />
              </li>
            ))}
          </ul>
        </MainBody>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Header = styled.header``;

const Main = styled.main`
  width: 600px;
`;

const MainHeader = styled.div`
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

const MainBody = styled.div``;

Home.getInitialProps = async ({ store }): Promise<any> => {
  await store.dispatch(fetchTweetList());
};

export default Home;
