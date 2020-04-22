import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import STYLES from '../styles/const';
import { SigninType } from '../types/auth';
import Button, { Variant } from './Button';
import InputText, { Validation } from './InputText';
import { fetchSignin } from '../store/auth/actions';
import { RootState } from '../store';

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignin = async () => {
    const data: SigninType = {
      id: userId,
      password,
    };
    dispatch(fetchSignin(data, router));
  };

  return (
    <Wrapper>
      <Form>
        <FormTitle>
          <span>Twitterにログイン</span>
        </FormTitle>
        <FormBody>
          <FormItem>
            <InputText
              label='userID'
              placeholder='半角英数字で入力'
              value={userId}
              validation={Validation.HALF_WIDTH}
              onChange={handleUserIdChange}
            />
          </FormItem>
          <FormItem>
            <InputText
              label='パスワード'
              placeholder='半角英数字で入力'
              value={password}
              password
              validation={Validation.HALF_WIDTH}
              onChange={handlePassword}
            />
          </FormItem>
        </FormBody>
        <FormSubmit>
          <ButtonWrapper>
            <Button
              text='ログイン'
              variant={Variant.CONTAINED}
              disabled={!userId || !password}
              onClick={handleSignin}
            />
          </ButtonWrapper>
        </FormSubmit>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 600px;
  padding: 40px 0;
  background-color: ${STYLES.COLOR.WHITE};
  border-radius: 12px;
`;

const Form = styled.div`
  padding: 0 30px;
`;

const FormTitle = styled.div`
  span {
    font-size: 23px;
  }
`;

const FormBody = styled.div`
  padding: 20px 0;
`;

const FormItem = styled.div`
  padding: 10px 0;
`;

const FormSubmit = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  width: 200px;
  height: 40px;
`;

export default Login;
