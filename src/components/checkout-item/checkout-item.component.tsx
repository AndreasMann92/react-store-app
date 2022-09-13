import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CartItemData } from "../../store/cart/cart.types";
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
  const dispatch = useDispatch();

  const { imageUrl, name, price, quantity } = cartItem;

  const cartItems = useSelector(selectCartItems);

  const addHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
  const clearHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity className="quantity">
        <Arrow onClick={removeHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addHandler}>&#10095;</Arrow>
      </Quantity>
      <Price>{price}€</Price>
      <RemoveButton onClick={clearHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};
