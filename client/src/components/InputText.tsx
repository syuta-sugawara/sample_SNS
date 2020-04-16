import React, { useState } from 'react';
import styled from 'styled-components';

import STYLES from '../styles/const';

type Props = {
  label: string;
  placeholder: string;
  value: string;
  limit?: number;
  password?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputText: React.FC<Props> = props => {
  const [isFocus, setFocus] = useState<boolean>(false);

  const handleFocusOn = (): void => {
    setFocus(true);
  };

  const handleFocusOff = (): void => {
    setFocus(false);
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
              onChange={props.onChange}
              onFocus={handleFocusOn}
              onBlur={handleFocusOff}
            />
          ) : (
            <input
              type={!props.password ? 'text' : 'password'}
              value={props.value}
              placeholder={props.placeholder}
              maxLength={props.limit}
              onChange={props.onChange}
              onFocus={handleFocusOn}
              onBlur={handleFocusOff}
            />
          )}
        </Input>
      </Head>
      {!props.limit ? null : (
        <Tail>
          <span>{`${props.value.length}/${props.limit}`}</span>
        </Tail>
      )}
    </>
  );
};

type FocusEventProps = {
  isFocus: boolean;
};

const Head = styled.div`
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
  padding: 0 10px;
  text-align: right;
  span {
    font-size: 15px;
    font-weight: 400;
    color: ${STYLES.COLOR.GRAY};
  }
`;

export default InputText;
