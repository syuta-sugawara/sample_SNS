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
import STYLES from '../styles/const';

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
        <Title>
          <span>teamO Twitter</span>
        </Title>
        <Buttons>
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
        </Buttons>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  div:not(:last-child) {
    margin-right: 20px;
  }
`;

const Title = styled.h1`
  span {
    font-family: ${STYLES.FONT.FAMILY.MARU_GOTHIC};
    font-size: 80px;
    color: ${STYLES.COLOR.PRIMARY};
    text-shadow: -1px -1px 0px ${STYLES.COLOR.PRIMARY_LIGHTER_30},
      3px 3px 0px ${STYLES.COLOR.PRIMARY_LIGHTER_30},
      6px 6px 0px ${STYLES.COLOR.PRIMARY_LIGHTER_30};
    letter-spacing: 5px;
  }
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 40px;
`;

const ButtonWrapper = styled.div`
  width: 200px;
  height: 40px;
`;

export default Index;
