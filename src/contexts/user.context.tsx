import { User } from "firebase/auth";
import { createContext, FC, PropsWithChildren, useState } from "react";

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
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
