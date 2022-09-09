import { FC, useContext } from "react";
import { CartContext, CartItemData } from "../../contexts/cart.context";
import "./checkout-item.scss";

export const CheckoutItem: FC<{ cartItem: CartItemData }> = ({ cartItem }) => {
  const { decreaseItemQuantity, increaseItemQuantity, removeItemFromCart } =
    useContext(CartContext);

  const { imageUrl, name, price, quantity } = cartItem;

  const decreaseQuantityHandler = () => decreaseItemQuantity(cartItem);
  const increaseQuantityHandler = () => increaseItemQuantity(cartItem);
  const removeItemFromCartHandler = () => removeItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decreaseQuantityHandler}>
          &#10094;
        </div>
        <div className="value">{quantity}</div>
        <div className="arrow" onClick={increaseQuantityHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}€</span>
      <div className="remove-button" onClick={removeItemFromCartHandler}>
        &#10005;
      </div>
    </div>
  );
};
