import React, { useState } from 'react';
import styled from 'styled-components';

import STYLES from '../styles/const';
import Button, { Variant } from './Button';
import InputText, { Validation } from './InputText';

const Signup: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isMisMatch, setIsMisMatch] = useState<boolean>(false);

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password !== confirmPassword) {
      setIsMisMatch(true);
    }
  };

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO
    console.log('登録処理');
  };

  return (
    <Wrapper>
      <Form>
        <FormTitle>
          <span>アカウントを作成</span>
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
              label="ユーザ名"
              placeholder=""
              value={name}
              onChange={handleNameChange}
            />
          </FormItem>
          <FormItem>
            <InputText
              label="メールアドレス"
              placeholder=""
              value={mail}
              validation={Validation.EMAIL}
              onChange={handleMailChange}
            />
          </FormItem>
          <FormItem>
            <InputText
              label="パスワード"
              placeholder="8文字以上の半角英数字で入力"
              value={password}
              password
              validation={Validation.PASSWORD}
              onChange={handlePassword}
            />
          </FormItem>
          <FormItem>
            <InputText
              label="パスワード（確認用）"
              placeholder="8文字以上の半角英数字で入力"
              value={confirmPassword}
              password
              validation={Validation.PASSWORD}
              onChange={handleConfirmPassword}
            />
            {!isMisMatch ? null : (
              <Error>入力したパスワードが一致していません</Error>
            )}
          </FormItem>
        </FormBody>
        <FormSubmit>
          <ButtonWrapper>
            <Button
              text="登録"
              variant={Variant.CONTAINED}
              onClick={handleRegister}
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
  margin-bottom: 20px;
`;

const FormSubmit = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  width: 200px;
  height: 40px;
`;

const Error = styled.span`
  font-size: 15px;
  font-weight: 400;
  color: ${STYLES.COLOR.RED};
`;

export default Signup;
