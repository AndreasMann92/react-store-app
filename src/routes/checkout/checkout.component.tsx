import { useContext } from "react";
import { CheckoutItem } from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../contexts/cart.context";

import "./checkout.styles.jsx";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderCol,
  TotalPrice,
} from "./checkout.styles.jsx";

export const Checkout = () => {
  const { cartItems, totalCartPrice } = useContext(CartContext);
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderCol>
          <span>Product</span>
        </HeaderCol>
        <HeaderCol>
          <span>Description</span>
        </HeaderCol>
        <HeaderCol>
          <span>Quantity</span>
        </HeaderCol>
        <HeaderCol>
          <span>Price</span>
        </HeaderCol>
        <HeaderCol>
          <span>Remove</span>
        </HeaderCol>
      </CheckoutHeader>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <TotalPrice>
        Total: <>{totalCartPrice}</>
      </TotalPrice>
    </CheckoutContainer>
  );
};
