import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { fetchPostTweet } from '../store/tweet/actions';
import STYLES from '../styles/const';
import { UserType } from '../types/user';
import CloseIcon from './icons/CloseIcon';
import Button, { Variant } from './Button';

type Props = {
  user: UserType;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const TweetForm: React.FC<Props> = props => {
  const [value, setValue] = useState<string>('');
  const [wordCount, setCount] = useState<number>(0);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setCount(e.target.value.length);
  };

  const handleSubmit = () => {
    dispatch(fetchPostTweet({ content: value, tweetType: 'tweet' }));
    setValue('');
  };

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
              maxLength={140}
              onChange={handleChange}
            />
          </FormHead>
          <FormTail>
            <WordCounter>
              文字数：
              {wordCount}
            </WordCounter>
            <ButtonWrapper>
              <Button
                text="ツイートする"
                variant={Variant.CONTAINED}
                disabled={!value ? true : false}
                onClick={handleSubmit}
              />
            </ButtonWrapper>
          </FormTail>
        </Form>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 60vh;
  background-color: ${STYLES.COLOR.WHITE};
  @media ${STYLES.DEVICE.LAPTOP} {
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 295px;
    background-color: ${STYLES.COLOR.WHITE};
    border-radius: 14px;
  }
`;

const Head = styled.div`
  height: 60px;
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
  flex: 1;
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

const ButtonWrapper = styled.div`
  width: 150px;
  height: 40px;
`;

const WordCounter = styled.div`
  margin: 10px;
`;

export default TweetForm;
