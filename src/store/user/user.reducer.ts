import { AnyAction, Reducer } from "redux";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  UserAction,
} from "./user.action";
import { UserState } from "./user.types";

const INITIAL_STATE: UserState = {
  currentUser: undefined,
  isLoading: false,
};

export const userReducer: Reducer<UserState, UserAction> = (
  state: UserState = INITIAL_STATE,
  action = {} as AnyAction
): UserState => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }
  if (signInFailed.match(action)) {
    return { ...state, error: action.payload };
  }
  if (signUpFailed.match(action)) {
    return { ...state, error: action.payload };
  }
  if (signOutFailed.match(action)) {
    return { ...state, error: action.payload };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: void 0 };
  }
  return state;
};
