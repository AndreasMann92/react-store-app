import {
  CategoryAction,
  CategoryActionType,
  CategoryState,
} from "./category.types";

export const INITIAL_STATE: CategoryState = {
  categories: [],
};

export const categoriesReducer = (
  state: CategoryState = INITIAL_STATE,
  action: CategoryAction
) => {
  const { type, payload } = action;

  switch (type) {
    case CategoryActionType.SET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return { ...state };
  }
};
