import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import modalAction from '../store/modal/actions';
import STYLES from '../styles/const';
import HomeIcon from './icons/HomeIcon';
import TweetBtnIcon from './icons/TweetBtnIcon';
import TwitterIcon from './icons/TwitterIcon';
import Button, { Variant } from './Button';

const Navigation: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    path: string
  ): void => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <Wrapper>
      <Logo>
        <TwitterIcon />
      </Logo>
      <ul>
        <li>
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
        </li>
        <li>
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
        </li>
      </ul>
      <ButtonContainer>
        <ResponsiveDiv isMobile>
          <TweetSmallButton
            onClick={() =>
              dispatch(modalAction.setIsDisplay({ isDisplay: true }))
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
              dispatch(modalAction.setIsDisplay({ isDisplay: true }))
            }
          />
        </ResponsiveDiv>
      </ButtonContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 200px;
`;

const Logo = styled.div`
  padding-left: 10px;
  fill: ${STYLES.COLOR.PRIMARY};
  svg {
    width: 40px;
    height: 40px;
  }
`;

const ButtonContainer = styled.div`
  padding: 10px;
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
    props.isMobile ? 'block' : 'none'};
  @media ${STYLES.DEVICE.LAPTOP} {
    display: ${(props: ResponsiveDivProps): string =>
      props.isMobile ? 'none' : 'block'};
  }
`;

export default Navigation;
