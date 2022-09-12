import { FC, useContext } from "react";
import { CartContext, CartItemData } from "../../contexts/cart.context";
import "./checkout-item.styles.jsx";
import {
  Arrow,
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Price,
  Quantity,
  RemoveButton,
  Value,
} from "./checkout-item.styles.jsx";

export const CheckoutItem: FC<{ cartItem: CartItemData }> = ({ cartItem }) => {
  const { decreaseItemQuantity, increaseItemQuantity, removeItemFromCart } =
    useContext(CartContext);

  const { imageUrl, name, price, quantity } = cartItem;

  const decreaseQuantityHandler = () => decreaseItemQuantity(cartItem);
  const increaseQuantityHandler = () => increaseItemQuantity(cartItem);
  const removeItemFromCartHandler = () => removeItemFromCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity className="quantity">
        <Arrow onClick={decreaseQuantityHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={increaseQuantityHandler}>&#10095;</Arrow>
      </Quantity>
      <Price>{price}€</Price>
      <RemoveButton onClick={removeItemFromCartHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};
