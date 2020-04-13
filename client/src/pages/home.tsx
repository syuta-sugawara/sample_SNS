import { NextPage } from 'next';
import React, { useState } from 'react';
import styled from 'styled-components';

import STYLES from '../styles/const';

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Header></Header>
      <Main>
        <MainHeader>
          <h2>ホーム</h2>
        </MainHeader>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
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

export default Home;
