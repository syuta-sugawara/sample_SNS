import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import STYLES from '../styles/const';
import { RootState } from '../store';
import modalAction from '../store/modal/actions';

const Modal: React.FC = () => {
  const popupRef = useRef<any>(null);
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal);

  const handleClose = () => {
    dispatch(modalAction.hide());
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (popupRef && !popupRef.current.contains(e.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Wrapper isDisplay={modalState.isDisplay}>
      <Content ref={popupRef}>{modalState.children}</Content>
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
  transform: translateX(-50%);
`;

export default Modal;
