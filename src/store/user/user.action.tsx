import { User, UserInfo } from "firebase/auth";
import { createAction } from "../../utils/reducer.utils";
import { AppUser, UserActionType, UserSignUp } from "./user.types";

export const setCurrentUser = (user: User | null) =>
  createAction(UserActionType.SET_CURRENT_USER, user);

export const checkUserSession = () =>
  createAction(UserActionType.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(UserActionType.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email: string, password: string) =>
  createAction(UserActionType.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user: AppUser) =>
  createAction(UserActionType.SIGN_IN_SUCCESS, user);

export const signInFailed = (error: Error) =>
  createAction(UserActionType.SIGN_IN_FAILED, error);

export const signUpStart = (userSignUp: UserSignUp) => {
  return createAction(UserActionType.SIGN_UP_START, userSignUp);
};

export const signUpSuccess = (user: UserInfo) =>
  createAction(UserActionType.SIGN_UP_SUCCESS, user);

export const signUpFailed = (error: Error) =>
  createAction(UserActionType.SIGN_UP_FAILED, error);

export const signOutStart = () => createAction(UserActionType.SIGN_OUT_START);

export const signOutSuccess = () =>
  createAction(UserActionType.SIGN_OUT_SUCCESS);

export const signOutFailed = (error: Error) =>
  createAction(UserActionType.SIGN_OUT_FAILED, error);
