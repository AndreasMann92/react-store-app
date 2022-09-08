import { User } from "firebase/auth";
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import {
  createUserDocumentFromAuth,
  onAuthStageChangedListener,
} from "../utils/firebase.utils";

type UserInfo = {
  currentUser?: User;
  setCurrentUser: (user: User | undefined) => void;
};

export const UserContext = createContext<UserInfo>({
  currentUser: void 0,
  setCurrentUser: (user: User | undefined) => void 0,
});

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>();
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
