import { User, UserInfo } from "firebase/auth";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signIn,
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase.utils";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpSuccess,
} from "./user.action";
import { UserActionType, UserSignUp } from "./user.types";

export function* getSnapshotFromUserAuth(
  userAuth: UserInfo,
  additionalDetails?: {}
) {
  try {
    const userSnapshot: DocumentSnapshot<DocumentData> = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    console.log(userSnapshot.data());
    yield put(signInSuccess(userSnapshot.data() as User));
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    put(signInFailed(error as Error));
  }
}

export function* signInWithEmail(action: any) {
  const { email, password } = action.payload;
  try {
    const { user } = yield call(signIn, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    put(signInFailed(error as Error));
  }
}

export function* signUp(action: any) {
  const { email, password, displayName } = action.payload as UserSignUp;
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess({ ...user, displayName }));
  } catch (error) {
    yield put(signUpFailed(error as Error));
  }
}

export function* signInAfterSignUp(action: any) {
  const userInfo = action.payload as UserInfo;
  yield call(getSnapshotFromUserAuth, userInfo);
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    put(signOutFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const auth: User = yield call(getCurrentUser);
    if (!auth) return;
    yield call(getSnapshotFromUserAuth, auth);
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionType.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionType.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionType.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionType.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionType.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionType.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
