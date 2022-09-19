import { CategoryItem } from "../category/category.types";

export enum CartActionType {
  SET_IS_OPEN = "cart/SET_IS_OPEN",
  SET_CART_ITEMS = "cart/SET_CART_ITEMS",
  SET_CART_COUNT = "cart/SET_CART_COUNT",
  SET_CART_TOTAL = "cart/SET_CART_TOTAL",
}

export type CartItemData = {
  quantity: number;
} & CategoryItem;

export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItemData[];
};
