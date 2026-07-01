import { ReactNode } from 'react';
import { User } from './Auth';

export interface FirebaseContextType {
  googleSignIn: () => Promise<Partial<User> | undefined>;
  googleSignOut: () => Promise<void>;
  createUser: (profile: Partial<User>) => Promise<Partial<User>>;
  updateUser: (id: string, data: Partial<User>) => Promise<void>;
  getUser: (id: string) => Promise<User | {}>;
  uploadToCloudinary: (input: CloudinaryUploadArgs) => Promise<CloudinaryUploadResult>;
  localState: Record<string, unknown>;
  setLocalState: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}

export interface FirebaseContextProviderProps {
  children: ReactNode;
}

export type CloudinaryUploadArgs = {
  uri: string;           
  uploadPreset: string;
  folder?: string;     
  fileName?: string;   
  mime?: string;       
};

export type CloudinaryUploadResult = {
  asset_id: string;
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  [k: string]: any;
};
