import { AnyAction, Reducer } from "redux";
import { CartAction, setCartItems, setIsCartOpen } from "./cart.action";
import { CartState } from "./cart.types";

const INITAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer: Reducer<CartState, CartAction> = (
  state = INITAL_STATE,
  action: AnyAction
) => {
  if (setCartItems.match(action)) {
    return { ...state, cartItems: action.payload };
  }
  if (setIsCartOpen.match(action)) {
    return { ...state, isCartOpen: action.payload };
  }
  return state;
};
