import React from 'react';
import styled from 'styled-components';

import STYLES from '../styles/const';
import HomeIcon from './icons/HomeIcon';
import TweetBtnIcon from './icons/TweetBtnIcon';
import TwitterIcon from './icons/TwitterIcon';
import Button, { Variant } from './Button';

const Navigation: React.FC = () => {
  const handleClick = (): void => {
    console.log('display modal window');
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
              onClick={handleClick}
              icon={<HomeIcon />}
            />
          </ResponsiveDiv>
          <ResponsiveDiv>
            <Button
              text="ホーム"
              variant={Variant.TEXT}
              onClick={handleClick}
              icon={<HomeIcon />}
            />
          </ResponsiveDiv>
        </li>
        <li>
          <ResponsiveDiv isMobile>
            <Button
              text=""
              variant={Variant.TEXT}
              onClick={handleClick}
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
              onClick={handleClick}
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
          <TweetSmallButton>
            <TweetBtnIcon />
          </TweetSmallButton>
        </ResponsiveDiv>
        <ResponsiveDiv>
          <Button
            text="ツイートする"
            variant={Variant.CONTAINED}
            onClick={handleClick}
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

const TweetSmallButton = styled.div`
  fill: ${STYLES.COLOR.PRIMARY};
  svg {
    width: 40px;
    height: 40px;
  }
`;

const ResponsiveDiv = styled.div`
  display: ${props => (props.isMobile ? 'block' : 'none')};
  @media ${STYLES.DEVICE.LAPTOP} {
    display: ${props => (props.isMobile ? 'none' : 'block')};
  }
`;

export default Navigation;
