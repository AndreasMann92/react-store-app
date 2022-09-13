import { Product } from "../category/category.types";

export enum CartActionType {
  SET_IS_OPEN = "cart/SET_IS_OPEN",
  SET_CART_ITEMS = "cart/SET_CART_ITEMS",
  SET_CART_COUNT = "cart/SET_CART_COUNT",
  SET_CART_TOTAL = "cart/SET_CART_TOTAL",
}

export type CartItemData = {
  quantity: number;
} & Product;

export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItemData[];
};

export type CartAction = SetCartItemsAction | SetIsOpenAction;

type SetCartItemsAction = {
  type: CartActionType.SET_CART_ITEMS;
  payload: CartItemData[];
};

type SetIsOpenAction = {
  type: CartActionType.SET_IS_OPEN;
  payload: boolean;
};
