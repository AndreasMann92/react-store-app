export enum CategoryActionType {
  SET_CATEGORIES,
}

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

export type CategoryArray = { title: string; items: Product[] }[];

export type CategoriesMap = { [category: string]: Product[] };

export type CategoryAction = SetCategoriesAction;

export type CategoryState = {
  categories: CategoryArray;
};

type SetCategoriesAction = {
  type: CategoryActionType.SET_CATEGORIES;
  payload: CategoryArray;
};
