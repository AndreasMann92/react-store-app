import {
  CategoryAction,
  CategoryActionType,
  CategoryState,
} from "./category.types";

export const INITIAL_STATE: CategoryState = {
  categories: [],
  isLoading: false,
  error: void 0,
};

export const categoriesReducer = (
  state: CategoryState = INITIAL_STATE,
  action: CategoryAction
): CategoryState => {
  const { type, payload } = action;

  switch (type) {
    case CategoryActionType.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CategoryActionType.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categories: payload };
    case CategoryActionType.FETCH_CATEGORIES_FAIL:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};
