import React, { useState } from 'react';
import styled from 'styled-components';

import Button, { Variant } from './Button';
import InputText, { Validation } from './InputText';

const Signup: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO
    console.log('ログイン処理');
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
              onClick={handleLogin}
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

export default Signup;
