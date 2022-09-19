import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer.utils";
import { CategoryItem } from "../category/category.types";
import { CartActionType, CartItemData } from "./cart.types";

const addCartItem = (
  cartItems: CartItemData[],
  productToAdd: CategoryItem
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
  productToRemove: CategoryItem
) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (
  cartItems: CartItemData[],
  cartItem: CartItemData
): CartItemData[] => {
  const indexToRemove = cartItems.findIndex(({ id }) => id === cartItem.id);
  cartItems.splice(indexToRemove, 1);
  return [...cartItems];
};

export type CartAction = SetCartItemsAction | SetIsOpenAction;

type SetCartItemsAction = ActionWithPayload<
  CartActionType.SET_CART_ITEMS,
  CartItemData[]
>;
type SetIsOpenAction = ActionWithPayload<CartActionType.SET_IS_OPEN, boolean>;

export const setIsCartOpen = withMatcher(
  (val: boolean): SetIsOpenAction =>
    createAction(CartActionType.SET_IS_OPEN, val)
);

export const setCartItems = withMatcher(
  (cartItems: CartItemData[]): SetCartItemsAction =>
    createAction(CartActionType.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItemData[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CartActionType.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItemData[],
  productToRemove: CategoryItem
) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CartActionType.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItemData[],
  cartItem: CartItemData
) => {
  const newCartItems = clearCartItem(cartItems, cartItem);
  return createAction(CartActionType.SET_CART_ITEMS, newCartItems);
};
