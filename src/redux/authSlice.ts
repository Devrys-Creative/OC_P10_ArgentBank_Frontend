import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// interface
export interface authInterface {
    success: boolean,
    error: null|string,
}

const initialState:authInterface = {
    success: false,
    error: null,
};

// slice
export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        clear: () => {
            return initialState;
        },
        setSuccess: (currentState) => {
            return {...currentState,...{success:true}};
        },
        setError: (currentState, action:PayloadAction<string>) => {
            return {...currentState,...{error:action.payload}};
        }
    },
});

// selectors
export const getAuthErrorMessage = (state:RootState):null|string => state.auth.error;