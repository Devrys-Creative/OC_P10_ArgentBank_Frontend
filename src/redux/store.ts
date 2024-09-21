import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { thunk } from "redux-thunk";

const initialState = {
    user: userSlice.getInitialState(),
}

export const store = configureStore({
    preloadedState: initialState,
    reducer: combineReducers({
        user: userSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// types
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;