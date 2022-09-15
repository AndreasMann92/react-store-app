import { createAction } from "../../utils/reducer.utils";
import { CategoryActionType, CategoryArray } from "./category.types";

export const fetchCategoriesStart = () =>
  createAction(CategoryActionType.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories: CategoryArray) =>
  createAction(CategoryActionType.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFail = (error: Error) =>
  createAction(CategoryActionType.FETCH_CATEGORIES_FAIL, error);
