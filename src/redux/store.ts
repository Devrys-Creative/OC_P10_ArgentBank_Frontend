import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { thunk } from "redux-thunk";
import { authSlice } from "./authSlice";
import { fetchStatusSlice } from "./fetchStatusSlice";

const initialState = {
    user: userSlice.getInitialState(),
    auth: authSlice.getInitialState(),
    fetchStatus: fetchStatusSlice.getInitialState(),
}

export const store = configureStore({
    preloadedState: initialState,
    reducer: combineReducers({
        user: userSlice.reducer,
        auth: authSlice.reducer,
        fetchStatus: fetchStatusSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// types
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;