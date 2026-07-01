import { useCallback } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { startLoading, stopLoading } from '../../store/slices/Async';

export default function useAsync() {
  const dispatch = useAppDispatch();
  return useCallback(async (fn: () => Promise<any>) => {
    dispatch(startLoading());
    try {
      return await fn();
    } finally {
      dispatch(stopLoading());
    }
  }, [dispatch]);
}
