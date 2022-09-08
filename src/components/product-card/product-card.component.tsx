import { FC, useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { Product } from "../../contexts/products.context";
import { Button } from "../button/button-component";
import "./product-card.scss";

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
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={onProductAddHandler}>
        Add to cart
      </Button>
    </div>
  );
};
