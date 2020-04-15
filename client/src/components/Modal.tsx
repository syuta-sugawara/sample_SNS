import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import TweetForm from '../components/TweetForm';
import modalAction from '../store/modal/actions';
import { RootState } from '../store';
import STYLES from '../styles/const';
import { UserType } from '../types/user';

// TODO: 決め打ちでTweetForm表示しているがJSX.Elementに対応できるようにする
const Modal: React.FC = () => {
  const user: UserType = {
    id: 'xxxxx',
    screenName: 'hoge',
    iconUrl:
      'https://pbs.twimg.com/profile_images/1195340954548363266/OeJ3BmJ2_400x400.jpg',
  };
  const [value, setValue] = useState<string>('');
  const popupRef = useRef<any>(null);
  const dispatch = useDispatch();
  const isDisplay = useSelector((state: RootState) => state.modal.isDisplay);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    alert(`${value}とツイートする`);
  };

  const handleClose = () => {
    dispatch(modalAction.setIsDisplay({ isDisplay: false }));
  };

  const handleClickOutside = (event: any) => {
    if (popupRef && !popupRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Wrapper isDisplay={isDisplay}>
      <Content ref={popupRef}>
        <TweetForm
          user={user}
          value={value}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      </Content>
    </Wrapper>
  );
};

type WrapperProps = {
  isDisplay: boolean;
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: ${(props: WrapperProps): string =>
    props.isDisplay ? 'block' : 'none'};
  width: 100%;
  height: 100%;
  background: ${STYLES.COLOR.BLACK_LIGHTER_30};
`;

const Content = styled.div`
  position: absolute;
  top: 5%;
  left: 50%;
  width: 600px;
  transform: translateX(-50%);
`;

export default Modal;
