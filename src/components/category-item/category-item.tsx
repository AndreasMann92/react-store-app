import { FC } from "react";

import "./category-item.scss";

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
    <div className="category-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
};
