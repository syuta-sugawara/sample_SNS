import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';

import STYLES from '../styles/const';
import { TweetType } from '../types/tweet';
import { fromNow } from '../utils/time';
import Button, { Variant } from './Button';
import RetweetIcon from './icons/RetweetIcon';
import LikeIcon from './icons/LikeIcon';
import TweetAPI from '../requests/tweet';

enum TextVariant {
  PRIMARY,
  SECONDARY,
}

type Props = {
  tweet: TweetType;
};

const TweetItem: React.FC<Props> = props => {
  const user = props.tweet.user;
  const [retweetCount, setRetweetCount] = useState<number>(0);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isRetweet, setRetweetDisable] = useState<boolean>(false);
  const [isLike, setLikeDisable] = useState<boolean>(false);

  const ApiRequest = new TweetAPI();

  const handlePostRetweets = async () => {
    try {
      const res = await ApiRequest.putRetweets();
      if (!res.ok) {
        throw Error(res.statusText);
      }
      setRetweetCount(retweetCount + 1);
      setRetweetDisable(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePostLike = async () => {
    try {
      const res = await ApiRequest.putRetweets();
      if (!res.ok) {
        throw Error(res.statusText);
      }
      setLikeCount(likeCount + 1);
      setLikeDisable(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper>
      <Label></Label>
      <Body>
        <UserIcon>
          <img src={user.iconUrl} alt={user.screenName} />
        </UserIcon>
        <Content>
          <ContentHead>
            <User>
              <Link href="/users/[uid]" as={`/users/${user.id}`}>
                <a>
                  <Text variant={TextVariant.PRIMARY} bold>
                    {user.screenName}
                  </Text>
                  <Text variant={TextVariant.SECONDARY}>{`@${user.id}`}</Text>
                </a>
              </Link>
            </User>
            <Separator>
              <Text variant={TextVariant.SECONDARY}>·</Text>
            </Separator>
            <Time>
              <Text variant={TextVariant.SECONDARY}>
                {fromNow(props.tweet.createdAt)}
              </Text>
            </Time>
          </ContentHead>
          <ContentBody>
            <Tweet>
              <Text variant={TextVariant.PRIMARY}>{props.tweet.content}</Text>
            </Tweet>
            <Reaction>
              <ButtonWrapper disabled={isRetweet}>
                <Button
                  text=""
                  variant={Variant.TEXT}
                  onClick={handlePostRetweets}
                  disabled={isRetweet}
                  icon={<RetweetIcon />}
                />
                <RetweetCounter>{retweetCount}</RetweetCounter>
              </ButtonWrapper>
              <ButtonWrapper disabled={isLike}>
                <Button
                  text=""
                  variant={Variant.TEXT}
                  onClick={handlePostLike}
                  disabled={isLike}
                  icon={<LikeIcon />}
                />
                <LikeCounter>{likeCount}</LikeCounter>
              </ButtonWrapper>
            </Reaction>
          </ContentBody>
        </Content>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 100%;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background-color: ${STYLES.COLOR.OFF_WHITE};
  }
  &:active {
    background-color: ${STYLES.COLOR.GRAY_LIGHTER_30};
  }
  a {
    text-decoration: none;
  }
`;

const Label = styled.div`
  /* todo: ooさんがリツイート/いいねしました */
`;

const Body = styled.div`
  display: flex;
`;

const UserIcon = styled.div`
  margin: 0 5px;
  img {
    width: 50px;
    height: 50px;
    pointer-events: none;
    user-select: none;
    border-radius: 50%;
  }
`;

const Content = styled.div`
  flex: 1;
  margin: 0 5px;
`;

const ContentHead = styled.div`
  display: flex;
  a:hover {
    text-decoration: underline;
  }
`;

const User = styled.div`
  span:not(:last-child) {
    margin-right: 5px;
  }
`;

const Separator = styled.div`
  display: none;
  padding: 0 5px;
  @media ${STYLES.DEVICE.MOBILE} {
    display: block;
  }
`;

const Time = styled.div`
  display: none;
  @media ${STYLES.DEVICE.MOBILE} {
    display: block;
  }
`;

const ContentBody = styled.div``;

const Tweet = styled.div``;

const Reaction = styled.div`
  display: flex;
`;

type ButtonWrapperProps = {
  disabled?: boolean;
};

const ButtonWrapper = styled.div`
  display: flex;
  width: 100px;
  height: 40px;
  opacity: ${(props: ButtonWrapperProps) => (props.disabled ? '1' : '0.3')};
`;

const RetweetCounter = styled.div`
  margin-top: 14px;
  margin-right: 20px;
`;

const LikeCounter = styled.div`
  margin-top: 14px;
  margin-right: 20px;
`;

type TextProps = {
  variant: TextVariant;
  bold?: boolean;
};

const Text = styled.span`
  font-size: 15px;
  font-weight: ${(props: TextProps): number => (props.bold ? 700 : 400)};
  color: ${(props: TextProps): string =>
    props.variant === TextVariant.PRIMARY
      ? STYLES.COLOR.BLACK
      : STYLES.COLOR.GRAY};
`;

export default TweetItem;
