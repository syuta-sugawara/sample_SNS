import React from 'react';
import { useSelector } from 'react-redux';
import { NextPage } from 'next';

import { RootState } from '../store';

const Index: NextPage = () => {
  const currentCount = useSelector((state: RootState) => state.counter);
  console.log(currentCount);
  return <h1>Hello world!</h1>;
};

export default Index;
