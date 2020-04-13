import React from 'react';
import styled from 'styled-components';

import STYLES from '../styles/const';
import HomeIcon from './icons/HomeIcon';
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
          <Button
            text="ホーム"
            variant={Variant.TEXT}
            onClick={handleClick}
            icon={<HomeIcon />}
          />
        </li>
        <li>
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
        </li>
      </ul>
      <ButtonContainer>
        <Button
          text="ツイートする"
          variant={Variant.CONTAINED}
          onClick={handleClick}
        />
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

export default Navigation;
