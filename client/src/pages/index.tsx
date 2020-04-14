import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';

import counterAction, { fetchDocs } from '../store/counter/acitons';
import { RootState } from '../store';

const Index: NextPage = () => {
  const dispatch = useDispatch();
  const currentCount = useSelector((state: RootState) => state.counter);
  console.log(currentCount);

  const handleIncrement = (): any => {
    dispatch(counterAction.increment({ count: 1 }));
  };

  return (
    <>
      <h1>Hello world!</h1>
      <button onClick={handleIncrement}>+1</button>
    </>
  );
};

Index.getInitialProps = async ({ store }): Promise<any> => {
  await store.dispatch(fetchDocs());
};

export default Index;
