import { createContext, FC, PropsWithChildren, useState } from "react";

type CartContextType = {
  isCartOpen: boolean;
  setIsCartOpen: (val: boolean) => void;
};

const defaultState = {
  isCartOpen: false,
  setIsCartOpen: () => void 0,
};

export const CartContext = createContext<CartContextType>(defaultState);

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
