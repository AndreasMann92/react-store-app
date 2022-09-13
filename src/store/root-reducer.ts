import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { UserInfo } from "./user/user.types";

export type ReduxState = {
    user: UserInfo
}

export const rootReducer = combineReducers({
    user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;