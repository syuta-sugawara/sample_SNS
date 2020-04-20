import React, { useState } from 'react';
import styled from 'styled-components';

import AuthAPI from '../requests/auth';
import STYLES from '../styles/const';
import { SigninType } from '../types/auth';
import { ErrorResponse } from '../types/errorResponse';
import Button, { Variant } from './Button';
import InputText, { Validation } from './InputText';

const Login: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignin = async () => {
    // TODO
    console.log('ログイン処理');
    const authAPI = new AuthAPI();
    try {
      const data: SigninType = {
        id: userId,
        password,
      };
      const res = await authAPI.postSignin(data);
      if (res.ok) {
        const result = await res.json();
        console.log(result);
      } else {
        const result = (await res.json()) as ErrorResponse;
        throw new Error(result.massage);
      }
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
    }
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
              label="userID"
              placeholder="半角英数字で入力"
              value={userId}
              validation={Validation.HALF_WIDTH}
              onChange={handleUserIdChange}
            />
          </FormItem>
          <FormItem>
            <InputText
              label="パスワード"
              placeholder="半角英数字で入力"
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
              text="ログイン"
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
