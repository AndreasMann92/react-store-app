import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Category } from "../../components/category/category.component";
import { setCategories } from "../../store/category/category.action";
import { getCollectionAndDocuments } from "../../utils/firebase.utils";
import { CategoriesPreview } from "../categories-preview/categories-preview.component";
import "./shop.scss";

export const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categories = await getCollectionAndDocuments();
      dispatch(setCategories(categories));
    };
    getCategoriesMap();
  });

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
