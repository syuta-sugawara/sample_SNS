import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import modalAction from '../store/modal/actions';
import STYLES from '../styles/const';
import { UserType } from '../types/user';
import HomeIcon from './icons/HomeIcon';
import TweetBtnIcon from './icons/TweetBtnIcon';
import TwitterIcon from './icons/TwitterIcon';
import Button, { Variant } from './Button';
import TweetForm from './TweetForm';

const Navigation: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user: UserType = {
    id: 'junkisai',
    screenName: 'じゅんきち',
    iconUrl:
      'https://pbs.twimg.com/profile_images/1195340954548363266/OeJ3BmJ2_400x400.jpg',
    followIDs: [],
    followedIDs: [],
  };

  const handleClose = () => {
    dispatch(modalAction.hide());
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    path: string
  ): void => {
    e.preventDefault();
    router.push(path);
  };

  const tweetForm = <TweetForm user={user} onClose={handleClose} />;

  return (
    <Wrapper>
      <Logo>
        <TwitterIcon />
      </Logo>
      <Menu>
        <MenuItem>
          <ResponsiveDiv isMobile>
            <Button
              text=""
              variant={Variant.TEXT}
              onClick={(e: React.MouseEvent<HTMLButtonElement>): void =>
                handleClick(e, '/home')
              }
              icon={<HomeIcon />}
            />
          </ResponsiveDiv>
          <ResponsiveDiv>
            <Button
              text="ホーム"
              variant={Variant.TEXT}
              onClick={(e: React.MouseEvent<HTMLButtonElement>): void =>
                handleClick(e, '/home')
              }
              icon={<HomeIcon />}
            />
          </ResponsiveDiv>
        </MenuItem>
        <MenuItem>
          <ResponsiveDiv isMobile>
            <Button
              text=""
              variant={Variant.TEXT}
              onClick={(e: React.MouseEvent<HTMLButtonElement>): void =>
                handleClick(e, '/users/hoge')
              }
              icon={
                <img
                  src="https://pbs.twimg.com/profile_images/1195340954548363266/OeJ3BmJ2_400x400.jpg"
                  alt="aaa"
                />
              }
            />
          </ResponsiveDiv>
          <ResponsiveDiv>
            <Button
              text="プロフィール"
              variant={Variant.TEXT}
              onClick={(e: React.MouseEvent<HTMLButtonElement>): void =>
                handleClick(e, '/users/hoge')
              }
              icon={
                <img
                  src="https://pbs.twimg.com/profile_images/1195340954548363266/OeJ3BmJ2_400x400.jpg"
                  alt="aaa"
                />
              }
            />
          </ResponsiveDiv>
        </MenuItem>
        <MenuItem>
          <ResponsiveDiv isMobile>
            <TweetSmallButton
              onClick={() =>
                dispatch(modalAction.show({ children: tweetForm }))
              }
            >
              <TweetBtnIcon />
            </TweetSmallButton>
          </ResponsiveDiv>
          <ResponsiveDiv>
            <Button
              text="ツイートする"
              variant={Variant.CONTAINED}
              onClick={() =>
                dispatch(modalAction.show({ children: tweetForm }))
              }
            />
          </ResponsiveDiv>
        </MenuItem>
      </Menu>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100px;
  padding: 10px 10px 0;
  @media ${STYLES.DEVICE.LAPTOP} {
    width: 200px;
  }
`;

const Menu = styled.ul`
  width: 100%;
`;

const MenuItem = styled.li`
  height: 45px;
  margin: 7px 0;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  fill: ${STYLES.COLOR.PRIMARY};
  @media ${STYLES.DEVICE.LAPTOP} {
    justify-content: left;
  }
  svg {
    width: 40px;
    height: 40px;
  }
`;

const TweetSmallButton = styled.button`
  fill: ${STYLES.COLOR.PRIMARY};
  svg {
    width: 40px;
    height: 40px;
  }
`;

type ResponsiveDivProps = {
  isMobile?: boolean;
};

const ResponsiveDiv = styled.div`
  display: ${(props: ResponsiveDivProps): string =>
    props.isMobile ? 'flex' : 'none'};
  justify-content: center;
  height: 100%;
  @media ${STYLES.DEVICE.LAPTOP} {
    display: ${(props: ResponsiveDivProps): string =>
      props.isMobile ? 'none' : 'block'};
  }
`;

export default Navigation;
