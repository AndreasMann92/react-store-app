import { Reducer } from "redux";
import { UserAction, UserActionType, UserState } from "./user.types";

const INITIAL_STATE: UserState = {
  currentUser: undefined,
  isLoading: false,
};

export const userReducer: Reducer<UserState, UserAction> = (
  state: UserState = INITIAL_STATE,
  action: UserAction
): UserState => {
  const { type, payload } = action;
  switch (type) {
    case UserActionType.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload };
    case UserActionType.SIGN_IN_FAILED:
      return { ...state, error: payload };
    case UserActionType.SIGN_UP_FAILED:
      return { ...state, error: payload };
    case UserActionType.SIGN_OUT_FAILED:
      return { ...state, error: payload };
    case UserActionType.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: void 0 };
    default:
      return state;
  }
};
