import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext, Product } from "../../contexts/categories.context";
import { ProductCard } from "../product-card/product-card.component";
import "./category.styles.jsx";
import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";

export const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(category ? categoriesMap[category] : []);
  }, [category, categoriesMap]);

  return (
    <>
      <CategoryTitle>{category?.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </CategoryContainer>
    </>
  );
};
