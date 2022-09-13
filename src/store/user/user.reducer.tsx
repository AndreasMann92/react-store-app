import { Reducer } from "redux";
import { UserAction, UserActionType, UserInfo } from "./user.types";

const INITIAL_STATE: UserInfo = {
  currentUser: undefined,
};

export const userReducer: Reducer<UserInfo, UserAction> = (
  state: UserInfo = INITIAL_STATE,
  action: UserAction
): UserInfo => {
  console.log("userReducer");
  const { type, payload } = action;
  switch (type) {
    case UserActionType.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};
