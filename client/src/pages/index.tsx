import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Button, { Variant } from '../components/Button';
import Login from '../components/Login';
import Modal from '../components/Modal';
import Signup from '../components/Signup';
import modalAction from '../store/modal/actions';

const Index: NextPage = () => {
  const dispatch = useDispatch();

  const handleOpenSignup = () => {
    dispatch(modalAction.show({ children: <Signup /> }));
  };

  const handleOpenSignin = () => {
    dispatch(modalAction.show({ children: <Login /> }));
  };

  return (
    <>
      <Head>
        <title>teamO Twitter</title>
      </Head>
      <Modal />
      <Wrapper>
        <ButtonWrapper>
          <Button
            text="ログイン"
            variant={Variant.OUTLINED}
            onClick={handleOpenSignin}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            text="サインアップ"
            variant={Variant.CONTAINED}
            onClick={handleOpenSignup}
          />
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  div:not(:last-child) {
    margin-right: 20px;
  }
`;

const ButtonWrapper = styled.div`
  width: 200px;
  height: 40px;
`;

export default Index;
