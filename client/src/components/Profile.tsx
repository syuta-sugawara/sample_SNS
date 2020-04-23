import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Button, { Variant } from '../components/Button';
import { fetchFollow, fetchUnFollow } from '../store/user/actions';
import STYLES from '../styles/const';
import { UserType } from '../types/user';
import { defaultHeaderUrl } from '../utils/image';

type Props = {
  user: UserType;
  isMine?: boolean;
  isFollow?: boolean;
};

const Profile: React.FC<Props> = props => {
  const { user, isMine, isFollow } = props;
  const dispatch = useDispatch();

  const handleEditProfile = () => {
    //todo: プロフィール編集コンポーネント出す
  };

  const handleFollow = () => {
    dispatch(fetchFollow(user.id));
  };

  const handleUnFollow = () => {
    dispatch(fetchUnFollow(user.id));
  };

  const button = (() => {
    if (isMine)
      return (
        <Button
          text="プロフィールを編集"
          variant={Variant.OUTLINED}
          onClick={handleEditProfile}
        />
      );
    if (isFollow)
      return (
        <Button
          text="フォローをはずす"
          variant={Variant.CONTAINED}
          onClick={handleUnFollow}
        />
      );
    return (
      <Button
        text="フォロー"
        variant={Variant.OUTLINED}
        onClick={handleFollow}
      />
    );
  })();

  return (
    <Wrapper>
      <Header>
        <img src={defaultHeaderUrl} alt="" />
      </Header>
      <Main>
        <MainHead>
          <ProfileImageWrapper>
            <ProfileImage>
              <img src={user.iconUrl} alt={user.screenName} />
            </ProfileImage>
          </ProfileImageWrapper>
          <ButtonWrapper>{button}</ButtonWrapper>
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
          <SelfIntroduction>{user.comment}</SelfIntroduction>
          <Follow>
            <div>
              <span>{user.followIDs.length}</span>
              <SecondaryText>フォロー</SecondaryText>
            </div>
            <div>
              <span>{user.followedIDs.length}</span>
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
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

const SelfIntroduction = styled.div``;

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
