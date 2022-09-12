import { FC } from "react";
import { CartItemData } from "../../contexts/cart.context";
import { CartItemContainer, ItemDetails, Name } from "./cart-item.styles.jsx";

export const CartItem: FC<{ cartItem: CartItemData }> = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <span>
          {quantity} x €{price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};
