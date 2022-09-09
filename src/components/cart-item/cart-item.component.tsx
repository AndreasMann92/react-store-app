import { FC } from "react";
import { CartItemData } from "../../contexts/cart.context";
import "./cart-item.scss";

export const CartItem: FC<{ cartItem: CartItemData }> = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x €{price}
        </span>
      </div>
    </div>
  );
};
