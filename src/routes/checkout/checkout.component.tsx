import { useContext } from "react";
import { CheckoutItem } from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../contexts/cart.context";

import "./checkout.scss";

export const Checkout = () => {
  const { cartItems, totalCartPrice } = useContext(CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-col">
          <span>Product</span>
        </div>
        <div className="header-col">
          <span>Description</span>
        </div>
        <div className="header-col">
          <span>Quantity</span>
        </div>
        <div className="header-col">
          <span>Price</span>
        </div>
        <div className="header-col">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <span className="total-price">
        Total: <>{totalCartPrice}</>
      </span>
    </div>
  );
};
