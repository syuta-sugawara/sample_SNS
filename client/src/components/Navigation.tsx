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
          <SpDiv>
            <Button
              text=""
              variant={Variant.TEXT}
              onClick={handleClick}
              icon={<HomeIcon />}
            />
          </SpDiv>
          <Div>
            <Button
              text="ホーム"
              variant={Variant.TEXT}
              onClick={handleClick}
              icon={<HomeIcon />}
            />
          </Div>
        </li>
        <li>
          <SpDiv>
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
          </SpDiv>
          <Div>
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
          </Div>
        </li>
      </ul>
      <ButtonContainer>
        <SpDiv>
          <TweetSmallButton>
            <TweetBtnIcon />
          </TweetSmallButton>
        </SpDiv>
        <Div>
          <Button
            text="ツイートする"
            variant={Variant.CONTAINED}
            onClick={handleClick}
          />
        </Div>
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

const SpDiv = styled.div`
  @media ${STYLES.DEVICE.LAPTOP} {
    display: none;
  }
`;

const Div = styled.div`
  display: none;
  @media ${STYLES.DEVICE.LAPTOP} {
    display: block;
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

export default Navigation;
