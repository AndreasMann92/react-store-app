import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { CartItemData, CartState } from "./cart.types";

const selectCartReducer = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart: CartState) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart: CartState) => cart.isCartOpen
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems: CartItemData[]) =>
    cartItems.map((i) => i.quantity).reduce((a, b) => a + b, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems: CartItemData[]) =>
    cartItems.reduce(
      (total, { quantity, price }) => total + quantity * price,
      0
    )
);
