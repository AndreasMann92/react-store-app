import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
  Middleware,
} from "redux";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./root-reducer";

import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean) as Middleware[];

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    (window as { [key: string]: any })[
      "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"
    ]) ||
  compose;

const persistConfig = {
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
