import { FC } from "react";
import { Product } from "../../contexts/categories.context";
import { ProductCard } from "../product-card/product-card.component";
import "./category-preview.styles.jsx";
import {
  CategoryPreviewContainer,
  Preview,
  Title,
} from "./category-preview.styles.jsx";

type CategoryPreviewProps = {
  title: string;
  products: Product[];
};

export const CategoryPreview: FC<CategoryPreviewProps> = ({
  title,
  products,
}) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products.slice(0, 4).map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </Preview>
    </CategoryPreviewContainer>
  );
};
