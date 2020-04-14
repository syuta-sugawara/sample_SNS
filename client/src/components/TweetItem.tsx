import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import STYLES from '../styles/const';
import { TweetType } from '../types/tweet';
import { fromNow } from '../utils/time';

enum TextVariant {
  PRIMARY,
  SECONDARY,
}

type Props = {
  tweet: TweetType;
};

const TweetItem: React.FC<Props> = props => {
  const user = props.tweet.user;

  return (
    <Wrapper>
      <Label></Label>
      <Body>
        <UserIcon>
          <img src={user.iconURL} alt={user.screenName} />
        </UserIcon>
        <Content>
          <ContentHead>
            <User>
              <Link href={`/users/${user.id}`}>
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
            <div>
              <Text variant={TextVariant.SECONDARY}>
                {fromNow(props.tweet.createdAt)}
              </Text>
            </div>
          </ContentHead>
          <ContentBody>
            <Tweet>
              <Text variant={TextVariant.PRIMARY}>{props.tweet.content}</Text>
            </Tweet>
            <Reaction></Reaction>
          </ContentBody>
        </Content>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 598px;
  padding: 10px 15px;
  cursor: pointer;
  border: solid 1px ${STYLES.COLOR.GRAY_LIGHTER_20};
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
  padding: 0 5px;
`;

const ContentBody = styled.div``;

const Tweet = styled.div``;

const Reaction = styled.div`
  /* todo: reply, retweet, like */
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
