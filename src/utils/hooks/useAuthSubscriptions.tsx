import auth from '@react-native-firebase/auth';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { loginSuccess, logout } from '../../store/slices/AuthSlice';
import { useFirebaseContext } from './useFirebaseContext';
import { startLoading, stopLoading } from '../../store/slices/Async';

export default function useAuthSubscriptions() {
  const dispatch = useAppDispatch();
  const { getUser } = useFirebaseContext();

  const getUserRef = useRef(getUser);
  useEffect(() => {
    getUserRef.current = getUser;
  }, [getUser]);

  useEffect(() => {
    const unsub = auth().onAuthStateChanged(async fbUser => {
      dispatch(startLoading());
      if (!fbUser) {
        dispatch(logout());
        dispatch(stopLoading());
        return;
      }
      const dbUser = await getUserRef.current(fbUser.uid).catch(() => null);
      dispatch(
        loginSuccess({
          user: {
            id: fbUser.uid,
            fullName: fbUser.displayName ?? '',
            ...(dbUser ?? {}),
          },
        }),
      );

      dispatch(stopLoading());
    });
    return unsub;
  }, [dispatch]);
}
