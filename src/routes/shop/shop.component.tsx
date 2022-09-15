import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Category } from "../../components/category/category.component";
import { fetchCategoriesStart } from "../../store/category/category.action";
import { CategoriesPreview } from "../categories-preview/categories-preview.component";
import "./shop.scss";

export const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  });

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
