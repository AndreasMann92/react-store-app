import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { Product } from "./products.context";

type CartContextType = {
  isCartOpen: boolean;
  setIsCartOpen: (val: boolean) => void;
  cartItems: CartItemData[];
  addItemToCart: (productToAdd: Product) => void;
  increaseItemQuantity: (cartItem: CartItemData) => void;
  decreaseItemQuantity: (cartItem: CartItemData) => void;
  removeItemFromCart: (cartItem: CartItemData) => void;
  cartCount: number;
  totalCartPrice: number;
};

const defaultState: CartContextType = {
  isCartOpen: false,
  setIsCartOpen: () => void 0,
  cartItems: [],
  addItemToCart: () => void 0,
  increaseItemQuantity: () => void 0,
  decreaseItemQuantity: () => void 0,
  removeItemFromCart: () => void 0,
  cartCount: 0,
  totalCartPrice: 0,
};

export type CartItemData = {
  quantity: number;
} & Product;

const addCartItem = (
  cartItems: CartItemData[],
  productToAdd: Product
): CartItemData[] => {
  const existingCartItem = cartItems.find(({ id }) => id === productToAdd.id);
  if (existingCartItem) {
    existingCartItem.quantity++;
    return [...cartItems];
  }
  return [
    ...cartItems,
    {
      ...productToAdd,
      quantity: 1,
    },
  ];
};

const removeCartItem = (
  cartItems: CartItemData[],
  cartItem: CartItemData
): CartItemData[] => {
  const indexToRemove = cartItems.findIndex(({ id }) => id === cartItem.id);
  cartItems.splice(indexToRemove, 1);
  return [...cartItems];
};

const setCartItemQuantity = (
  cartItems: CartItemData[],
  cartItemToChange: CartItemData,
  quantity: number
): CartItemData[] => {
  const existingCartItem = cartItems.find(
    ({ id }) => id === cartItemToChange.id
  );
  if (existingCartItem) {
    existingCartItem.quantity = quantity;
  }
  return [...cartItems];
};

export const CartContext = createContext<CartContextType>(defaultState);

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.map((i) => i.quantity).reduce((a, b) => a + b, 0));
    setTotalCartPrice(cartItems.map(totalItemPrice).reduce((a, b) => a + b, 0));
  }, [cartItems]);

  const addItemToCart = (productToAdd: Product) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const increaseItemQuantity = (cartItem: CartItemData) => {
    const { quantity } = cartItem;
    setCartItems(setCartItemQuantity(cartItems, cartItem, quantity + 1));
  };

  const decreaseItemQuantity = (cartItem: CartItemData) => {
    const { quantity } = cartItem;
    if (quantity === 1) removeItemFromCart(cartItem);
    else setCartItems(setCartItemQuantity(cartItems, cartItem, quantity - 1));
  };

  const removeItemFromCart = (cartItem: CartItemData) => {
    setCartItems(removeCartItem(cartItems, cartItem));
  };

  const totalItemPrice = (cartItem: CartItemData) => {
    const { quantity, price } = cartItem;
    return quantity * price;
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
    totalItemPrice,
    totalCartPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
