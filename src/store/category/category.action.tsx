import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer.utils";
import { CategoryActionType, CategoryArray } from "./category.types";

export type FetchCategoriesStart =
  Action<CategoryActionType.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
  CategoryActionType.FETCH_CATEGORIES_SUCCESS,
  CategoryArray
>;

export type FetchCategoriesFail = ActionWithPayload<
  CategoryActionType.FETCH_CATEGORIES_FAIL,
  Error
>;

export type CategoryAction =
  | FetchCategoriesStart
  | FetchCategoriesSuccess
  | FetchCategoriesFail;

export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart =>
    createAction(CategoryActionType.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher(
  (categories: CategoryArray): FetchCategoriesSuccess =>
    createAction(CategoryActionType.FETCH_CATEGORIES_SUCCESS, categories)
);

export const fetchCategoriesFail = withMatcher(
  (error: Error): FetchCategoriesFail =>
    createAction(CategoryActionType.FETCH_CATEGORIES_FAIL, error)
);
