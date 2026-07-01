import { User } from './Auth';

export interface CloudinaryUploadArgs {
  uri: string;
  uploadPreset: string;
  folder?: string;
  fileName?: string;
  mime?: string;
}

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export interface FirebaseContextType {
  googleSignIn: () => Promise<Partial<User> | undefined>;
  googleSignOut: () => Promise<void>;
  createUser: (profile: Partial<User>) => Promise<Partial<User>>;
  updateUser: (id: string, data: Partial<User>) => Promise<void>;
  getUser: (id: string) => Promise<User>;
  uploadToCloudinary: (args: CloudinaryUploadArgs) => Promise<CloudinaryUploadResult>;
  localState: Record<string, any>;
  setLocalState: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export interface FirebaseContextProviderProps {
  children: React.ReactNode;
}
