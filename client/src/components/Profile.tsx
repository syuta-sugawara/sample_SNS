import React from 'react';
import styled from 'styled-components';

import Button, { Variant } from '../components/Button';
import STYLES from '../styles/const';
import { UserType } from '../types/user';

type Props = {
  user: UserType;
  isMine?: boolean;
};

const Profile: React.FC<Props> = props => {
  const { user, isMine } = props;
  const handleClick = () => {
    // TODO:
    console.log('hi');
  };
  return (
    <Wrapper>
      <Header>
        <img
          src="https://pbs.twimg.com/profile_banners/636957320/1514493736/1500x500"
          alt=""
        />
      </Header>
      <Main>
        <MainHead>
          <ProfileImageWrapper>
            <ProfileImage>
              <img src={user.iconUrl} alt={user.screenName} />
            </ProfileImage>
          </ProfileImageWrapper>
          <ButtonWrapper>
            {/* TODO: !isMineのときフォロー・アンフォローでさらに分岐させる必要あり */}
            <Button
              text={isMine ? 'プロフィールを編集' : 'フォロー'}
              variant={Variant.OUTLINED}
              onClick={handleClick}
            />
          </ButtonWrapper>
        </MainHead>
        <MainBody>
          <User>
            <div>
              <StrongText>{user.screenName}</StrongText>
            </div>
            <div>
              <SecondaryText>{`@${user.id}`}</SecondaryText>
            </div>
          </User>
          <SelfIntroduction>
            衆議院議員阿部晋三（あべしんぞう）の公式twitterです。Prime Minister
            of Japon. Leader of Liberal Democratic Party.
          </SelfIntroduction>
          <Follow>
            <div>
              <span>193万</span>
              <SecondaryText>フォロー</SecondaryText>
            </div>
            <div>
              <span>18</span>
              <SecondaryText>フォロワー</SecondaryText>
            </div>
          </Follow>
        </MainBody>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Header = styled.div`
  height: 200px;
`;

const Main = styled.div`
  padding: 10px 15px;
`;

const MainHead = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileImageWrapper = styled.div``;

const ProfileImage = styled.div`
  position: absolute;
  border: solid 3px ${STYLES.COLOR.WHITE};
  border-radius: 50%;
  transform: translateY(-75%);
  img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
  }
`;

const ButtonWrapper = styled.div`
  width: 170px;
  height: 37px;
`;

const MainBody = styled.div``;

const User = styled.div`
  margin-bottom: 10px;
`;

const SelfIntroduction = styled.div`
  margin-bottom: 10px;
`;

const Follow = styled.div`
  display: flex;
  div:not(:last-child) {
    margin-right: 20px;
  }
`;

const StrongText = styled.span`
  font-size: 19px;
  font-weight: 800;
`;

const SecondaryText = styled.span`
  font-size: 15px;
  color: ${STYLES.COLOR.GRAY};
`;

export default Profile;
