import { all, call } from "redux-saga/effects";
import { categoriesSaga as categoriesSagas } from "./category/category.saga";
import { userSagas } from "./user/user.saga";

export function* rootSaga() {
  yield all([call(categoriesSagas), call(userSagas)]);
}
