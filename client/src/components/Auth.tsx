import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTokenFromLocal } from '../store/auth/actions';
import { RootState } from '../store';

type Props = {
  children: React.ReactNode;
};

const Auth: React.FC<Props> = props => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isFirstRef = useRef(true);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const auth = useSelector((state: RootState) => state.auth);
  const { pathname } = router;

  useEffect(() => {
    isFirstRef.current = true;
  }, []);

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      dispatch(getTokenFromLocal());
    } else {
      const { token } = auth;
      if (pathname === '/home' && token === '') {
        router.push('/');
      }
      setIsLoading(false);
    }
  }, [dispatch, auth]);

  return <>{isLoading ? null : props.children}</>;
};

export default Auth;
