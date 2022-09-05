import { FC } from "react";
import { CategoryItem } from "../category-item/category-item";

import "./category-menu.scss";

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
    <div className="category-menu-container">
      {categories.map((category) => {
        return <CategoryItem key={category.id} category={category} />;
      })}
    </div>
  );
};
