import { useCallback, useState } from 'react';
import { initialState } from './data';
import type { AppState } from './types';

const storageKey = 'myuze-polished-prototype-v2';

function readState(): AppState {
  try {
    const value = window.localStorage.getItem(storageKey);
    return value ? { ...initialState, ...JSON.parse(value) } : initialState;
  } catch {
    return initialState;
  }
}

export function usePrototypeStore() {
  const [state, setState] = useState<AppState>(readState);

  const update = useCallback((updater: (current: AppState) => AppState) => {
    setState(current => {
      const next = updater(current);
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    window.localStorage.removeItem(storageKey);
    setState(initialState);
  }, []);

  return { state, update, reset };
}
