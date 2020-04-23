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

  const isCheckedAuth = useRef<boolean>(false);
  const isCheckedMyself = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const auth = useSelector((state: RootState) => state.auth);
  const myself = useSelector((state: RootState) => state.myself);
  const { pathname } = router;

  useEffect(() => {
    dispatch(getTokenFromLocal());
    isCheckedAuth.current = false;
    isCheckedMyself.current = false;
  }, []);

  useEffect(() => {
    if (!isCheckedAuth.current) {
      isCheckedAuth.current = true;
    } else {
      if (!auth.error && !isCheckedMyself.current) {
        dispatch(fetchCurrentUser());
        isCheckedMyself.current = true;
      } else if (auth.error) {
        router.push('/');
        setIsLoading(false);
      }
    }
  }, [auth]);

  useEffect(() => {
    if (isCheckedMyself.current) {
      if (pathname !== '/' && myself.error) {
        router.push('/');
      }
      setIsLoading(false);
    }
  }, [myself]);

  return <>{isLoading ? null : props.children}</>;
};

export default Auth;
