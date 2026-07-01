import { useContext } from 'react';
import { FirebaseContext } from '../context/FirebaseContext';

export const useFirebaseContext = () => {
  const ctx = useContext(FirebaseContext);
  if (!ctx) throw new Error('useFirebaseContext must be used within FirebaseContextProvider');
  return ctx;
};
