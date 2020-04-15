import React from 'react';
import styled from 'styled-components';

import STYLES from '../styles/const';
import { UserType } from '../types/user';
import CloseIcon from './icons/CloseIcon';
import Button, { Variant } from './Button';

type Props = {
  user: UserType;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const TweetForm: React.FC<Props> = props => {
  return (
    <Wrapper>
      <Head>
        <IconWrapper>
          <CloseButton onClick={props.onClose}>
            <CloseIcon />
          </CloseButton>
        </IconWrapper>
      </Head>
      <Body>
        <User>
          <img src={props.user.iconUrl} alt={props.user.screenName} />
        </User>
        <Form>
          <FormHead>
            <textarea
              placeholder="いまどうしてる？"
              onChange={props.onChange}
            />
          </FormHead>
          <FormTail>
            <Button
              text="ツイートする"
              variant={Variant.CONTAINED}
              disabled={!props.value ? true : false}
              onClick={props.onSubmit}
            />
          </FormTail>
        </Form>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 295px;
  background-color: ${STYLES.COLOR.WHITE};
  border-radius: 14px;
`;

const Head = styled.div`
  flex: 1;
  padding: 0 15px;
  border-bottom: solid 1px ${STYLES.COLOR.GRAY_LIGHTER_20};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const CloseButton = styled.button`
  width: 38px;
  height: 38px;
  padding: 8px;
  border-radius: 50%;
  &:hover {
    background-color: ${STYLES.COLOR.PRIMARY_LIGHTER_30};
  }
  &:active {
    background-color: ${STYLES.COLOR.PRIMARY_LIGHTER_20};
  }
  svg {
    width: 100%;
    height: 100%;
    fill: ${STYLES.COLOR.PRIMARY};
  }
`;

const Body = styled.div`
  display: flex;
  height: 242px;
  padding: 10px 15px;
`;

const User = styled.div`
  width: 50px;
  margin-right: 5px;
  img {
    width: 50px;
    height: 50px;
    pointer-events: none;
    user-select: none;
    border-radius: 50%;
  }
`;

const Form = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const FormHead = styled.div`
  flex: 1;
  textarea {
    width: 100%;
    height: 100%;
    font-size: 19px;
    line-height: 1.3;
  }
`;

const FormTail = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 50px;
`;

export default TweetForm;
