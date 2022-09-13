import { User } from "firebase/auth";

export enum UserActionType {
  SET_CURRENT_USER = "user/SET_CURRENT_USER",
}

export type UserState = {
  currentUser: User | undefined;
};

export type UserAction = SetUserAction;

type SetUserAction = {
  type: UserActionType.SET_CURRENT_USER;
  payload: User | undefined;
};
