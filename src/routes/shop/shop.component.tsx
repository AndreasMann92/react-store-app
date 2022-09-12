import { Route, Routes } from "react-router-dom";
import { Category } from "../../components/category/category.component";
import { CategoriesPreview } from "../categories-preview/categories-preview.component";
import "./shop.scss";

export const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
