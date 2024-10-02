// Slice used to manage the user data

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

// slice
const initialState:userInterface = {};
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