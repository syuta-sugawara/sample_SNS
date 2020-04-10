import React, { useState } from 'react';
import styled from 'styled-components';

import STYLES from '../styles/const';

type Props = {
  label: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
          <input
            type="text"
            value={props.value}
            placeholder={`${props.label}を追加`}
            onChange={props.onChange}
            onFocus={handleFocusOn}
            onBlur={handleFocusOff}
          />
        </Input>
      </Head>
      <Tail></Tail>
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

const Tail = styled.div``;

export default InputText;
