// Slice used to manage asynchronous fetch responses
// This slice is generic: it accomodates all future fetch status requirements

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// interface
interface FetchStatus {
    id: string;
    error: boolean;
    errorMessage: string;
    success: boolean;
    loading: boolean;
}

// slice definition
const createFetchStatus = (id:string):FetchStatus => {
    return {
        id: id,
        error: false,
        errorMessage: "",
        success : false,
        loading : false,
    }
}
const initialState:FetchStatus[] = [];
export const fetchStatusSlice = createSlice({
    name: "fetchStatus",
    initialState: initialState,
    reducers: {
        // create a fetchStatus element with a specified ID
        // don't duplicate elements if the ID already exists
        initStatus: (currentState, action:PayloadAction<string>) => {
            const currentFilteredState = currentState.filter((status) => status.id !== action.payload);
            const status = createFetchStatus(action.payload);
            return [...currentFilteredState,status];
        },
        // delete the fetchStatus element with the specified ID
        clearStatus: (currentState, action:PayloadAction<string>) => {
            const currentFilteredState = currentState.filter((status) => status.id !== action.payload);
            return [...currentFilteredState];
        },
        // set a fetchStatus (with a specified ID) to error
        setError: (currentState, action:PayloadAction<Partial<FetchStatus>>) => {
            const currentFilteredState = currentState.filter((status) => status.id !== action.payload.id);
            return [...currentFilteredState, {
                id: action.payload.id,
                error: true,
                errorMessage: action.payload.errorMessage,
                success: false,
                loading: false,
            } as FetchStatus];
        },
        // set a fetchStatus (with a specified ID) to success
        setSuccess: (currentState, action:PayloadAction<Partial<FetchStatus>>) => {
            const currentFilteredState = currentState.filter((status) => status.id !== action.payload.id);
            return [...currentFilteredState, {
                id: action.payload.id,
                error: false,
                errorMessage: "",
                success: true,
                loading: false,
            } as FetchStatus];
        },
        // set a fetchStatus (with a specified ID) to loading
        setLoading: (currentState, action:PayloadAction<Partial<FetchStatus>>) => {
            const currentFilteredState = currentState.filter((status) => status.id !== action.payload.id);
            return [...currentFilteredState, {
                id: action.payload.id,
                error: false,
                errorMessage: "",
                success: false,
                loading: true,
            } as FetchStatus];
        },
    },
});

// selectors : retrieve the fetchStatus element with a specified ID
export const getFetchStatus = (id:string) => (state:RootState):FetchStatus|undefined => state.fetchStatus.find((fetchStatus) => fetchStatus.id === id);