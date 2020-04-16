import React, { useState } from 'react';
import styled from 'styled-components';

import STYLES from '../styles/const';
import { isHalfWidth, isMailAddress } from '../utils/validation';

export enum Validation {
  EMAIL = 'email',
  HALF_WIDTH = 'half_width',
}

type Props = {
  label: string;
  placeholder: string;
  value: string;
  limit?: number;
  password?: boolean;
  validation?: Validation;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputText: React.FC<Props> = props => {
  const [isFocus, setFocus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFocusOn = (): void => {
    setFocus(true);
  };

  const handleFocusOff = (): void => {
    setFocus(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.validation !== undefined) {
      switch (props.validation) {
        case Validation.EMAIL:
          if (!isMailAddress(e.target.value)) {
            setErrorMessage('メールアドレスが正しくありません');
          } else {
            setErrorMessage('');
          }
          break;
        case Validation.HALF_WIDTH:
          if (!isHalfWidth(e.target.value)) {
            setErrorMessage('半角英数字以外の文字が含まれています');
          } else {
            setErrorMessage('');
          }
          break;
      }
    }
    props.onChange(e);
  };

  return (
    <>
      <Head isFocus={isFocus}>
        <Label isFocus={isFocus}>
          <span>{props.label}</span>
        </Label>
        <Input>
          {!props.limit ? (
            <input
              type={!props.password ? 'text' : 'password'}
              value={props.value}
              placeholder={props.placeholder}
              onChange={handleChange}
              onFocus={handleFocusOn}
              onBlur={handleFocusOff}
            />
          ) : (
            <input
              type={!props.password ? 'text' : 'password'}
              value={props.value}
              placeholder={props.placeholder}
              maxLength={props.limit}
              onChange={handleChange}
              onFocus={handleFocusOn}
              onBlur={handleFocusOff}
            />
          )}
        </Input>
      </Head>
      <Tail>
        <Error>{!errorMessage ? '' : errorMessage}</Error>
        <Limit>
          {!props.limit ? '' : `${props.value.length}/${props.limit}`}
        </Limit>
      </Tail>
    </>
  );
};

type FocusEventProps = {
  isFocus: boolean;
};

const Head = styled.div`
  user-select: none;
  background-color: ${STYLES.COLOR.OFF_WHITE};
  border-bottom: solid 2px
    ${(props: FocusEventProps): string =>
      props.isFocus ? STYLES.COLOR.PRIMARY : STYLES.COLOR.GRAY};
`;

const Input = styled.div`
  padding: 2px 10px 5px;
  input {
    width: 100%;
    font-size: 19px;
    &::placeholder {
      color: ${STYLES.COLOR.GRAY};
    }
  }
`;

const Label = styled.div`
  padding: 5px 10px 0;
  span {
    font-size: 15px;
    color: ${(props: FocusEventProps): string =>
      props.isFocus ? STYLES.COLOR.PRIMARY : STYLES.COLOR.GRAY};
  }
`;

const Tail = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  span {
    font-size: 15px;
    font-weight: 400;
  }
`;

const Limit = styled.span`
  color: ${STYLES.COLOR.GRAY};
`;

const Error = styled.span`
  color: ${STYLES.COLOR.RED};
`;

export default InputText;
