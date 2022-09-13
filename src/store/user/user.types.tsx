import { User } from "firebase/auth";

export enum UserActionType {
  SET_CURRENT_USER = "user/SET_CURRENT_USER",
}

export type UserAction = SetUserAction;

export type UserInfo = {
  currentUser: User | undefined;
  setCurrentUser?: (user: User | undefined) => void;
};

type SetUserAction = {
  type: UserActionType.SET_CURRENT_USER;
  payload: User | undefined;
};
