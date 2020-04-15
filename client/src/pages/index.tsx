import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import withLayout from '../components/Layout';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>teamO Twitter</title>
      </Head>
      <h1>Hello world!</h1>
    </>
  );
};

export default withLayout(Index);
