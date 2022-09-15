import { ReduxAction } from "../../utils/reducer.utils";

export enum CategoryActionType {
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_FAIL = "category/FETCH_CATEGORIES_FAIL",
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
}

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

export type CategoryState = {
  categories: CategoryArray;
  isLoading: boolean;
  error?: Error;
};

export type CategoryArray = { title: string; items: Product[] }[];

export type CategoriesMap = { [category: string]: Product[] };

export type CategoryAction =
  | ReduxAction<CategoryActionType.FETCH_CATEGORIES_SUCCESS, CategoryArray>
  | ReduxAction<CategoryActionType.FETCH_CATEGORIES_START, void>
  | ReduxAction<CategoryActionType.FETCH_CATEGORIES_FAIL, Error>;
