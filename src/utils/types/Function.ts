import { User } from "./Auth";

export type UserInputChangeHandler = <K extends keyof User>(
  key: K,
  value: User[K]
) => void;