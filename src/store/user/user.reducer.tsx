import { Reducer } from "redux";
import { UserAction, UserActionType, UserState } from "./user.types";

const INITIAL_STATE: UserState = {
  currentUser: undefined,
};

export const userReducer: Reducer<UserState, UserAction> = (
  state: UserState = INITIAL_STATE,
  action: UserAction
): UserState => {
  const { type, payload } = action;

  switch (type) {
    case UserActionType.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};
