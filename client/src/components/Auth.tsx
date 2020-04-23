import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTokenFromLocal } from '../store/auth/actions';
import { fetchCurrentUser } from '../store/myself/actions';
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
  const myself = useSelector((state: RootState) => state.myself);
  const { pathname } = router;

  useEffect(() => {
    dispatch(getTokenFromLocal());
    isFirstRef.current = true;
  }, []);

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      dispatch(fetchCurrentUser());
    } else {
      if (pathname !== '/' && (auth.error || myself.error)) {
        router.push('/');
      }
      setIsLoading(false);
    }
  }, [dispatch, auth, myself]);

  return <>{isLoading ? null : props.children}</>;
};

export default Auth;
