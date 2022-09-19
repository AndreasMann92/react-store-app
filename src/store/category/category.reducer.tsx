import { AnyAction } from "redux";
import {
  fetchCategoriesFail,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from "./category.action";
import { CategoryState } from "./category.types";

export const INITIAL_STATE: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state: CategoryState = INITIAL_STATE,
  action = {} as AnyAction
): CategoryState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, isLoading: false, categories: action.payload };
  }
  if (fetchCategoriesFail.match(action)) {
    return { ...state, isLoading: false, error: action.payload };
  }
  return state;
};
