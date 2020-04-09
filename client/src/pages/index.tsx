import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';

import { incrementAction } from '../store/counter/acitons';
import { CounterActionTypes } from '../store/counter/types';
import { RootState } from '../store';

const Index: NextPage = () => {
  const dispatch = useDispatch();
  const currentCount = useSelector((state: RootState) => state.counter);
  console.log(currentCount);

  const handleIncrement = (): CounterActionTypes => dispatch(incrementAction());

  return (
    <>
      <h1>Hello world!</h1>
      <button onClick={handleIncrement}>+1</button>
    </>
  );
};

export default Index;
