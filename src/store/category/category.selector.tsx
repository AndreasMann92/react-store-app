import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { CategoriesMap, CategoryArray, CategoryState } from "./category.types";

const selectCategoryReducer = (state: RootState) => {
  return state.categories;
};

export const selectCategories = createSelector(
  [selectCategoryReducer],
  ({ categories }: CategoryState) => {
    return categories;
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories: CategoryArray) => {
    return categories?.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoriesMap);
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  ({ isLoading }: CategoryState) => {
    return isLoading;
  }
);
