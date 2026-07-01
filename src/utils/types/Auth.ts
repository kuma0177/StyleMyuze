import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface User {
    id?: string;
    isNew?: boolean;
    fullName?: string;
    userName?: string;
    gender?: "male" | "female";
    dateOfBirth?: string;
    age?: string | number;
    skinTone?: string;
    clothingSize?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl',
    profilePhoto?: string;
    preferredStyles?: string[];
    bodyShape?: string;
    createdAt?: FirebaseFirestoreTypes.Timestamp;
    updatedAt?: FirebaseFirestoreTypes.Timestamp;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}