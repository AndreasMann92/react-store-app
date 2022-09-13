import { useSelector } from "react-redux";
import { CheckoutItem } from "../../components/checkout-item/checkout-item.component";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderCol,
  TotalPrice,
} from "./checkout.styles.jsx";

export const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const totalCartPrice = useSelector(selectCartTotal);

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
