import { RootState } from "../root-reducer";
import { CategoriesMap } from "./category.types";

export const selectCategoriesMap = (state: RootState) =>
  state.categories?.categories?.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {} as CategoriesMap);
