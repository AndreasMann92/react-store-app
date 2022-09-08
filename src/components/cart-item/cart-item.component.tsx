import { FC } from "react";
import { Product } from "../../contexts/products.context";
import "./cart-item.scss";

export type CartItemProps = {
  quantity: number;
} & Product;

export const CartItem: FC<{ cartItem: CartItemProps }> = ({ cartItem }) => {
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
