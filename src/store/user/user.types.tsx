import { User } from "firebase/auth";
import { ReduxAction } from "../../utils/reducer.utils";

export enum UserActionType {
  SET_CURRENT_USER = "user/SET_CURRENT_USER",
  CHECK_USER_SESSION = "user/CHECK_USER_SESSION",
  GOOGLE_SIGN_IN_START = "user/GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START = "user/EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS = "user/SIGN_IN_SUCCESS",
  SIGN_IN_FAILED = "user/SIGN_IN_FAILED",
  SIGN_UP_START = "user/SIGN_UP_START",
  SIGN_UP_SUCCESS = "user/SIGN_UP_SUCCESS",
  SIGN_UP_FAILED = "user/SIGN_UP_FAILED",
  SIGN_OUT_START = "user/SIGN_OUT_START",
  SIGN_OUT_SUCCESS = "user/SIGN_OUT_SUCCESS",
  SIGN_OUT_FAILED = "user/SIGN_OUT_FAILED",
}

export type AppUser = {
  id: string;
  [key: string]: string;
};

export type UserState = {
  currentUser: User | undefined;
  isLoading: boolean;
  error?: Error;
};

export type UserSignUp = {
  displayName: string;
  email: string;
  password: string;
};

export type UserAction =
  | ReduxAction<UserActionType.SET_CURRENT_USER, User | undefined>
  | ReduxAction<UserActionType.CHECK_USER_SESSION>
  | ReduxAction<UserActionType.GOOGLE_SIGN_IN_START>
  | ReduxAction<UserActionType.EMAIL_SIGN_IN_START, UserSignUp>
  | ReduxAction<UserActionType.SIGN_IN_SUCCESS, User>
  | ReduxAction<UserActionType.SIGN_IN_FAILED, Error>
  | ReduxAction<UserActionType.SIGN_UP_START, UserSignUp>
  | ReduxAction<UserActionType.SIGN_UP_SUCCESS, User>
  | ReduxAction<UserActionType.SIGN_UP_FAILED, Error>
  | ReduxAction<UserActionType.SIGN_OUT_START>
  | ReduxAction<UserActionType.SIGN_OUT_SUCCESS>
  | ReduxAction<UserActionType.SIGN_OUT_FAILED, Error>;
