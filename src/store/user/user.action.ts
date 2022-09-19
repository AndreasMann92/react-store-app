import { User } from "firebase/auth";
import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer.utils";
import { UserActionType, UserSignIn, UserSignUp } from "./user.types";

export type UserAction =
  | SetCurrentUserAction
  | CheckUserSessionAction
  | GoogleSignInStartAction
  | EmailSignInStartAction
  | SignInSuccessAction
  | SignInFailedAction
  | SignUpStartAction
  | SignUpSuccessAction
  | SignUpFailedAction
  | SignOutStartAction
  | SignOutSuccessAction
  | SignOutFailedAction;

type SetCurrentUserAction = ActionWithPayload<
  UserActionType.SET_CURRENT_USER,
  User | null
>;
type CheckUserSessionAction = Action<UserActionType.CHECK_USER_SESSION>;
type GoogleSignInStartAction = Action<UserActionType.GOOGLE_SIGN_IN_START>;
type EmailSignInStartAction = ActionWithPayload<
  UserActionType.EMAIL_SIGN_IN_START,
  UserSignIn
>;
type SignInSuccessAction = ActionWithPayload<
  UserActionType.SIGN_IN_SUCCESS,
  User
>;
type SignInFailedAction = ActionWithPayload<
  UserActionType.SIGN_IN_FAILED,
  Error
>;
type SignUpStartAction = ActionWithPayload<
  UserActionType.SIGN_UP_START,
  UserSignUp
>;
type SignUpSuccessAction = ActionWithPayload<
  UserActionType.SIGN_UP_SUCCESS,
  User
>;
type SignUpFailedAction = ActionWithPayload<
  UserActionType.SIGN_UP_FAILED,
  Error
>;
type SignOutStartAction = Action<UserActionType.SIGN_OUT_START>;
type SignOutSuccessAction = Action<UserActionType.SIGN_OUT_SUCCESS>;
type SignOutFailedAction = ActionWithPayload<
  UserActionType.SIGN_OUT_FAILED,
  Error
>;

export const setCurrentUser = withMatcher(
  (user: User | null): SetCurrentUserAction =>
    createAction(UserActionType.SET_CURRENT_USER, user)
);

export const checkUserSession = withMatcher(
  (): CheckUserSessionAction => createAction(UserActionType.CHECK_USER_SESSION)
);

export const googleSignInStart = withMatcher(
  (): GoogleSignInStartAction =>
    createAction(UserActionType.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMatcher(
  (email: string, password: string): EmailSignInStartAction =>
    createAction(UserActionType.EMAIL_SIGN_IN_START, { email, password })
);

export const signInSuccess = withMatcher(
  (user: User): SignInSuccessAction =>
    createAction(UserActionType.SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatcher(
  (error: Error): SignInFailedAction =>
    createAction(UserActionType.SIGN_IN_FAILED, error)
);

export const signUpStart = withMatcher(
  (userSignUp: UserSignUp): SignUpStartAction => {
    return createAction(UserActionType.SIGN_UP_START, userSignUp);
  }
);

export const signUpSuccess = withMatcher(
  (user: User): SignUpSuccessAction =>
    createAction(UserActionType.SIGN_UP_SUCCESS, user)
);

export const signUpFailed = withMatcher(
  (error: Error): SignUpFailedAction =>
    createAction(UserActionType.SIGN_UP_FAILED, error)
);

export const signOutStart = withMatcher(
  (): SignOutStartAction => createAction(UserActionType.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(
  (): SignOutSuccessAction => createAction(UserActionType.SIGN_OUT_SUCCESS)
);

export const signOutFailed = withMatcher(
  (error: Error): SignOutFailedAction =>
    createAction(UserActionType.SIGN_OUT_FAILED, error)
);
