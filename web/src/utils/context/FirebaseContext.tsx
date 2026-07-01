import React, { createContext, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import { User } from '../types/Auth';
import { FirebaseContextType, FirebaseContextProviderProps, CloudinaryUploadArgs, CloudinaryUploadResult } from '../types/Firebase';

export const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

const googleProvider = new GoogleAuthProvider();

export const FirebaseContextProvider: React.FC<FirebaseContextProviderProps> = ({ children }) => {
  const [localState, setLocalState] = useState<Record<string, any>>({});

  const googleSignIn = async (): Promise<Partial<User> | undefined> => {
    const result = await signInWithPopup(auth, googleProvider);
    const fbUser = result.user;
    const user = await getUser(fbUser.uid);

    if (user.isNew === undefined) {
      const newUser: User = {
        id: fbUser.uid,
        fullName: fbUser.displayName ?? '',
        isNew: true,
      };
      return newUser;
    }
    return user;
  };

  const googleSignOut = async (): Promise<void> => {
    await signOut(auth);
  };

  const colRef = (id: string) => doc(db, 'users', id);

  const createUser = async (profile: Partial<User>): Promise<Partial<User>> => {
    await setDoc(colRef(profile.id!), profile);
    return profile;
  };

  const getUser = async (id: string): Promise<User> => {
    const snap = await getDoc(colRef(id));
    return snap.exists() ? (snap.data() as User) : ({} as User);
  };

  const updateUser = async (id: string, data: Partial<User>): Promise<void> => {
    await updateDoc(colRef(id), { ...data, updatedAt: serverTimestamp() });
  };

  const uploadToCloudinary = async ({
    uri,
    uploadPreset,
    folder,
    fileName,
    mime,
  }: CloudinaryUploadArgs): Promise<CloudinaryUploadResult> => {
    const cloudName = 'dywg3wtoa';
    const form = new FormData();

    // uri can be a blob URL (from file input) or a data URL
    const response = await fetch(uri);
    const blob = await response.blob();
    const inferredName = fileName ?? `upload_${Date.now()}.jpg`;
    const inferredMime = mime ?? blob.type ?? 'image/jpeg';
    form.append('file', new File([blob], inferredName, { type: inferredMime }));
    form.append('upload_preset', uploadPreset);
    if (folder) form.append('folder', folder);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: form,
    });

    const txt = await res.text();
    if (!res.ok) {
      let msg = txt;
      try { msg = JSON.parse(txt)?.error?.message ?? msg; } catch {}
      throw new Error(`Cloudinary upload failed (${res.status}): ${msg}`);
    }
    return JSON.parse(txt) as CloudinaryUploadResult;
  };

  return (
    <FirebaseContext.Provider value={{
      googleSignIn, googleSignOut, createUser, updateUser, getUser,
      uploadToCloudinary, localState, setLocalState,
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};
