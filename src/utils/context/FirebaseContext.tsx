import React, { createContext, useEffect, useState } from 'react';
import {
  CloudinaryUploadArgs,
  CloudinaryUploadResult,
  FirebaseContextProviderProps,
  FirebaseContextType,
} from '../types/Firebase';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import auth, {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { User } from '../types/Auth';

export const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined,
);

const WEB_CLIENT_ID =
  '290999065880-l4quloums7on3u5dluthv847jt0eh0cc.apps.googleusercontent.com';

export const FirebaseContextProvider: React.FC<
  FirebaseContextProviderProps
> = ({ children }) => {
  const [localState, setLocalState] = useState<Record<string, any>>({});

  useEffect(() => {
    const configureGoogleSignin = (webClientId: string): void => {
      GoogleSignin.configure({
        webClientId,
        offlineAccess: false,
        forceCodeForRefreshToken: false,
      });
    };

    configureGoogleSignin(WEB_CLIENT_ID);
  }, []);

  const googleSignIn = async (): Promise<Partial<User> | undefined> => {
    try {
      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      }

      const { data } = await GoogleSignin.signIn();
      const idToken = data?.idToken;
      if (!idToken) throw new Error('No Google ID token');

      const cred = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(getAuth(), cred);
      const fbUser = result.user;

      const user: User = await getUser(fbUser.uid);
      console.log("User >> ", user);

      if (user.isNew === undefined) {
        const newUser: User = {
          id: fbUser.uid,
          fullName: fbUser.displayName ?? '',
          isNew: true,
        };

        console.log("New User >> ", newUser);
        return newUser;
      }

      return user;
    } catch (e: any) {
      if (e?.code === statusCodes.SIGN_IN_CANCELLED) return {};
      if (e?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // show a toast/dialog if you want
      }
      console.log('Firebase sign-in error code:', e?.code);
      console.log('Firebase sign-in error message:', e?.message);
      throw e;
    }
  };

  const googleSignOut = async (): Promise<void> => {
    try {
      await GoogleSignin.signOut();
    } catch {}
    await auth().signOut();
  };

  // User
  const colUsers = () => firestore().collection('users');

  const createUser = async (
    profile: Partial<User>,
  ): Promise<Partial<User>> => {
    const user: Partial<User> = profile;
    await colUsers().doc(profile.id).set(user);
    return user;
  };

  const getUser = async (id: string): Promise<User> => {
    const snap = await colUsers().doc(id).get();
    return snap.exists() ? (snap.data() as User) : {};
  };

  const updateUser = async (id: string, data: Partial<User>) => {
    await colUsers()
      .doc(id)
      .update({
        ...data,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
  };

  const uploadToCloudinary = async ({
    uri,
    uploadPreset,
    folder,
    fileName,
    mime,
  }: CloudinaryUploadArgs): Promise<CloudinaryUploadResult> => {
    const cloudName = 'dywg3wtoa';

    const mimeFromName = (name: string): string | undefined => {
      const ext = name.split('.').pop()?.toLowerCase();
      switch (ext) {
        case 'jpg':
        case 'jpeg':
          return 'image/jpeg';
        case 'png':
          return 'image/png';
        case 'webp':
          return 'image/webp';
        case 'heic':
        case 'heif':
          return 'image/heic';
        default:
          return undefined;
      }
    };

    const inferredName =
      fileName ??
      uri.split('/').pop()?.split('?')[0] ??
      `upload_${Date.now()}.jpg`;
    const inferredMime = mime ?? mimeFromName(inferredName) ?? 'image/jpeg';

    const form = new FormData();
    form.append('file', { uri, name: inferredName, type: inferredMime } as any);
    form.append('upload_preset', uploadPreset);
    if (folder) form.append('folder', folder);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: form,
      },
    );

    const txt = await res.text();
    if (!res.ok) {
      let msg = txt;
      try {
        msg = JSON.parse(txt)?.error?.message ?? msg;
      } catch {}
      throw new Error(`Cloudinary upload failed (${res.status}): ${msg}`);
    }

    return JSON.parse(txt) as CloudinaryUploadResult;
  };

  return (
    <FirebaseContext.Provider
      value={{
        googleSignIn,
        googleSignOut,
        createUser,
        updateUser,
        getUser,
        uploadToCloudinary,
        localState,
        setLocalState,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
