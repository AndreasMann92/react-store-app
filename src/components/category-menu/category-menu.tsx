import { FC } from "react";
import { CategoryItem } from "../category-item/category-item";
import { CategoryMenuContainer } from "./category-menu.styles.jsx";

type Category = {
  id: number;
  title: string;
  imageUrl: string;
};

type CategoryMenuProps = {
  categories: Category[];
};

export const CategoryMenu: FC<CategoryMenuProps> = ({ categories }) => {
  return (
    <CategoryMenuContainer>
      {categories.map((category) => {
        return <CategoryItem key={category.id} category={category} />;
      })}
    </CategoryMenuContainer>
  );
};
