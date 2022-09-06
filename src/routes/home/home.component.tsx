import "../../App.scss";
import categories from "../../categories.json";
import { CategoryMenu } from "../../components/category-menu/category-menu";
import { Outlet } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <Outlet />
      <CategoryMenu categories={categories} />
    </>
  );
};
