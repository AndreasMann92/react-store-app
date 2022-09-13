import { Reducer } from "redux";
import { CartAction, CartActionType, CartState } from "./cart.types";

const INITAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer: Reducer<CartState, CartAction> = (
  state = INITAL_STATE,
  action: CartAction
) => {
  const { type, payload } = action;

  switch (type) {
    case CartActionType.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
    case CartActionType.SET_IS_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      return state;
  }
};
