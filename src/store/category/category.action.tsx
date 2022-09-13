import { createAction } from "../../utils/reducer.utils";
import { CategoryActionType, CategoryArray } from "./category.types";

export const setCategories = (categories: CategoryArray) =>
  createAction(CategoryActionType.SET_CATEGORIES, categories);
