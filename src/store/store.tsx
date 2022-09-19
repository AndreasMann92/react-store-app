import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
  Middleware,
} from "redux";
import logger from "redux-logger";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import createSagaMiddleware from "redux-saga";
import { rootReducer, RootState } from "./root-reducer";

import { rootSaga } from "./root-saga";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean) as Middleware[];

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist?: (keyof RootState)[];
  blacklist?: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
