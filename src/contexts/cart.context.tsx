import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { CartItemProps } from "../components/cart-item/cart-item.component";
import { Product } from "./products.context";

type CartItem = CartItemProps;

type CartContextType = {
  isCartOpen: boolean;
  setIsCartOpen: (val: boolean) => void;
  cartItems: CartItem[];
  addItemToCart: (productToAdd: Product) => void;
  cartCount: number;
};

const defaultState: CartContextType = {
  isCartOpen: false,
  setIsCartOpen: () => void 0,
  cartItems: [],
  addItemToCart: () => void 0,
  cartCount: 0,
};

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: Product
): CartItem[] => {
  const existingCartItem = cartItems.find(({ id }) => id === productToAdd.id);
  if (existingCartItem) {
    existingCartItem.quantity++;
    return [...cartItems];
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext<CartContextType>(defaultState);

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.map((i) => i.quantity).reduce((a, b) => a + b, 0));
  }, [cartItems]);

  const addItemToCart = (productToAdd: Product) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
