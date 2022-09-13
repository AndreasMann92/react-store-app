import {
  createContext,
  FC,
  PropsWithChildren,
  Reducer,
  useReducer,
} from "react";
import { Product } from "../store/category/category.types";
import { createAction } from "../utils/reducer.utils";

enum ActionType {
  SET_CART_ITEMS,
  SET_IS_OPEN,
}
type CartAction = SetCartItemsAction | SetIsOpenAction;

type SetCartItemsAction = {
  type: ActionType.SET_CART_ITEMS;
  payload: Partial<CartContextType>;
};

type SetIsOpenAction = {
  type: ActionType.SET_IS_OPEN;
  payload: boolean;
};

type CartContextType = {
  isCartOpen: boolean;
  cartItems: CartItemData[];
  cartCount: number;
  totalCartPrice: number;
  setIsCartOpen: (val: boolean) => void;
  addItemToCart: (productToAdd: Product) => void;
  increaseItemQuantity: (cartItem: CartItemData) => void;
  decreaseItemQuantity: (cartItem: CartItemData) => void;
  removeItemFromCart: (cartItem: CartItemData) => void;
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

const INITAL_STATE: CartContextType = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalCartPrice: 0,
  setIsCartOpen: () => void 0,
  addItemToCart: () => void 0,
  increaseItemQuantity: () => void 0,
  decreaseItemQuantity: () => void 0,
  removeItemFromCart: () => void 0,
};

export const CartContext = createContext<CartContextType>(INITAL_STATE);

const cartReducer: Reducer<CartContextType, CartAction> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.SET_CART_ITEMS:
      return { ...state, ...payload };
    case ActionType.SET_IS_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, totalCartPrice }, dispatch] =
    useReducer(cartReducer, INITAL_STATE);

  const updateCartItemsReducer = (newCartItems: CartItemData[]) => {
    const newCartCount = newCartItems
      .map((i) => i.quantity)
      .reduce((a, b) => a + b, 0);
    const newCartTotal = newCartItems
      .map(totalItemPrice)
      .reduce((a, b) => a + b, 0);
    dispatch(
      createAction(ActionType.SET_CART_ITEMS, {
        cartItems: newCartItems,
        totalCartPrice: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = (productToAdd: Product) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const increaseItemQuantity = (cartItem: CartItemData) => {
    const { quantity } = cartItem;
    const newCartItems = setCartItemQuantity(cartItems, cartItem, quantity + 1);
    updateCartItemsReducer(newCartItems);
  };

  const decreaseItemQuantity = (cartItem: CartItemData) => {
    const { quantity } = cartItem;
    if (quantity === 1) removeItemFromCart(cartItem);
    else {
      const newCartItems = setCartItemQuantity(
        cartItems,
        cartItem,
        quantity - 1
      );
      updateCartItemsReducer(newCartItems);
    }
  };

  const removeItemFromCart = (cartItem: CartItemData) => {
    const newCartItems = removeCartItem(cartItems, cartItem);
    updateCartItemsReducer(newCartItems);
  };

  const totalItemPrice = (cartItem: CartItemData) => {
    const { quantity, price } = cartItem;
    return quantity * price;
  };

  const setIsCartOpen = (isOpen: boolean) => {
    dispatch(createAction(ActionType.SET_IS_OPEN, isOpen));
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
