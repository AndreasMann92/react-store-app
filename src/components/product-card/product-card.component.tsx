import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CategoryItem } from "../../store/category/category.types";
import { Button, ButtonType } from "../button/button-component";
import {
  Footer,
  Name,
  Price,
  ProductCardContainer,
} from "./product-card.styles.jsx";

type ProductCardProps = {
  product: CategoryItem;
};

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const onProductAddHandler = () => dispatch(addItemToCart(cartItems, product));

  const { imageUrl, name, price } = product;

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType={ButtonType.INVERTED} onClick={onProductAddHandler}>
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};
