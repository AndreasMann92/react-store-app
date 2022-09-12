import { User } from "firebase/auth";
import {
  createContext,
  FC,
  PropsWithChildren,
  Reducer,
  useEffect,
  useReducer,
} from "react";
import {
  createUserDocumentFromAuth,
  onAuthStageChangedListener,
} from "../utils/firebase.utils";

enum UserActionType {
  SET_CURRENT_USER,
}

interface UserAction {
  type: UserActionType;
  payload: User | undefined;
}

interface UserInfo {
  currentUser: User | undefined;
  setCurrentUser?: (user: User | undefined) => void;
}

export const UserContext = createContext<UserInfo>({
  currentUser: void 0,
  setCurrentUser: (user) => void 0,
});

const userReducer: Reducer<UserInfo, UserAction> = (
  state: UserInfo,
  action: UserAction
): UserInfo => {
  const { type, payload } = action;
  switch (type) {
    case UserActionType.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled reducer action type ${type}`);
  }
};

const INITIAL_STATE: UserInfo = {
  currentUser: undefined,
};

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const setCurrentUser = (user: User | undefined) => {
    dispatch({ type: UserActionType.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    onAuthStageChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        setCurrentUser(user);
      }
    });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
