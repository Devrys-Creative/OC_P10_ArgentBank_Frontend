// Definition of the Redux store

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { userSlice } from "./userSlice";
import { fetchStatusSlice } from "./fetchStatusSlice";

const initialState = {
    user: userSlice.getInitialState(),
    fetchStatus: fetchStatusSlice.getInitialState(),
}

export const store = configureStore({
    preloadedState: initialState,
    reducer: combineReducers({
        user: userSlice.reducer,
        fetchStatus: fetchStatusSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// types
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;