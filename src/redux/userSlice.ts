import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// interface
export interface userInterface {
    email?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    userName?: string | null,
    id?: string | null,
    token?: string | null,
}

const initialState:userInterface = {};

// slice
export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (currentState, action:PayloadAction<Partial<userInterface>>) => {
            return {...currentState, ...action.payload};
        },
        clearUser: () => {
            return initialState;
        } 
    },
});

// selectors
export const getUser = (state:RootState): userInterface | null => (state?.user);
export const isLoggedIn = (state:RootState): boolean => (state?.user?.id ? true : false);
// export const getToken = (state:RootState): string | null => (state?.user?.token);