export enum CategoryActionType {
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_FAIL = "category/FETCH_CATEGORIES_FAIL",
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
}

export type CategoryItem = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

export type CategoryState = {
  categories: CategoryArray;
  isLoading: boolean;
  error: Error | null;
};

export type CategoryArray = { title: string; items: CategoryItem[] }[];

export type CategoriesMap = { [key: string]: CategoryItem[] };
