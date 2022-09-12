import { FC } from "react";
import {
  BackgroundImage,
  CategoryBodyContainer,
  CategoryItemContainer,
} from "./category-item.styles.jsx";

type Category = {
  title: string;
  imageUrl: string;
};

type CategoryItemProps = {
  category: Category;
};

export const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
  const { title, imageUrl } = category;
  return (
    <CategoryItemContainer to={`/shop/${title}`}>
      <BackgroundImage imageUrl={imageUrl} />
      <CategoryBodyContainer>
        <h2>{title}</h2>
        <p>Shop now</p>
      </CategoryBodyContainer>
    </CategoryItemContainer>
  );
};
