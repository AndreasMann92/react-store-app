import { all, call, put, takeLatest } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase.utils";
import { fetchCategoriesFail, fetchCategoriesSuccess } from "./category.action";
import { CategoryActionType, CategoryArray } from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    const categories: CategoryArray = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(categories));
  } catch (error) {
    yield put(fetchCategoriesFail(error as Error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CategoryActionType.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
