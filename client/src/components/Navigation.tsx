import { useRouter } from 'next/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../store';
import modalAction from '../store/modal/actions';
import STYLES from '../styles/const';
import HomeIcon from './icons/HomeIcon';
import TweetBtnIcon from './icons/TweetBtnIcon';
import TwitterIcon from './icons/TwitterIcon';
import Button, { Variant } from './Button';
import TweetForm from './TweetForm';

const Navigation: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const myself = useSelector((state: RootState) => state.myself);

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

  const tweetForm = <TweetForm user={myself} onClose={handleClose} />;

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
                handleClick(e, `/users/${myself.id}`)
              }
              icon={<img src={myself.iconUrl} alt={myself.screenName} />}
            />
          </ResponsiveDiv>
          <ResponsiveDiv>
            <Button
              text="プロフィール"
              variant={Variant.TEXT}
              onClick={(e: React.MouseEvent<HTMLButtonElement>): void =>
                handleClick(e, `/users/${myself.id}`)
              }
              icon={<img src={myself.iconUrl} alt={myself.screenName} />}
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
