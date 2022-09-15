import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/category/category.selector";
import { Product } from "../../store/category/category.types";
import { ProductCard } from "../product-card/product-card.component";
import { Spinner } from "../spinner/spinner.component";
import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";

export const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const products = category && categoriesMap ? categoriesMap[category] : [];
    setProducts(products);
  }, [category, categoriesMap]);

  return (
    <>
      <CategoryTitle>{category?.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products?.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </CategoryContainer>
      )}
    </>
  );
};
