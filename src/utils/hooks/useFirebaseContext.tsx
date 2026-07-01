import { useContext } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import { FirebaseContextType } from "../types/Firebase";

export const useFirebaseContext = (): FirebaseContextType => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebaseContext must be used within a FirebaseContextProvider');
  }
  return context;
};