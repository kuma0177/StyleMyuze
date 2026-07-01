import { User } from "../types/Auth";

// User
export const REQUIRED: ReadonlyArray<keyof User> = [
  'id',
  'isNew',
  'fullName',
  'userName',
] as const;
