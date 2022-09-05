import "./App.css";
import categories from "./categories.json";
import { CategoryMenu } from "./components/category-menu/category-menu";

export const App = () => {
  return <CategoryMenu categories={categories} />;
};
