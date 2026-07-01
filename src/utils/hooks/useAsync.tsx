import { useCallback } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { startLoading, stopLoading } from '../../store/slices/Async';

type AsyncRunner = <TData, TArgs extends any[] = []>(
  fn: (...args: TArgs) => Promise<TData>,
  ...args: TArgs
) => Promise<TData>;

const useAsync = (): AsyncRunner => {
  const dispatch = useAppDispatch();

  const run: AsyncRunner = useCallback(
    async (fn, ...args) => {
      console.log(`Calling >> ${fn.name} >> args >> `, ...args);
      dispatch(startLoading());
      try {
        const result = await fn(...args);
        return result;
      } catch (e) {
        console.log(`Error in ${fn.name} >> `, JSON.stringify(e));
        throw e;
      } finally {
        dispatch(stopLoading());
      }
    },
    [dispatch]
  );

  return run;
};

export default useAsync;
