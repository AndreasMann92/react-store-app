import { FC, useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { Product } from "../../contexts/categories.context";
import { Button, ButtonType } from "../button/button-component";
import "./product-card.styles.jsx";
import {
  Footer,
  Name,
  Price,
  ProductCardContainer,
} from "./product-card.styles.jsx";

type ProductCardProps = {
  product: Product;
};

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;

  const onProductAddHandler = () => {
    addItemToCart(product);
  };

  const { addItemToCart } = useContext(CartContext);
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
