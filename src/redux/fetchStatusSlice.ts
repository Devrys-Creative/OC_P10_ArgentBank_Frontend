import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
// import { RootState } from "./store";

// interface
interface FetchStatus {
    id: string;
    error: boolean;
    errorMessage: string;
    success: boolean;
    loading: boolean;
}
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

// slice
export const fetchStatusSlice = createSlice({
    name: "fetchStatus",
    initialState: initialState,
    reducers: {
        initStatus: (currentState, action:PayloadAction<string>) => {
            //clear state if id already exists
            const currentFilteredState = currentState.filter((status) => status.id !== action.payload);
            const status = createFetchStatus(action.payload);
            return [...currentFilteredState,status];
        },
        clearStatus: (currentState, action:PayloadAction<string>) => {
            const currentFilteredState = currentState.filter((status) => status.id !== action.payload);
            return [...currentFilteredState];
        },
        setError: (currentState, action:PayloadAction<Partial<FetchStatus>>) => {
            (currentState.find((status) => status.id === action.payload.id) as FetchStatus).error = true;
            (currentState.find((status) => status.id === action.payload.id) as FetchStatus).success = false;
            (currentState.find((status) => status.id === action.payload.id) as FetchStatus).loading = false;
            (currentState.find((status) => status.id === action.payload.id) as FetchStatus).errorMessage = action.payload.errorMessage as string;
            return currentState;
        },
        setSuccess: (currentState, action:PayloadAction<Partial<FetchStatus>>) => {
            (currentState.find((status) => status.id === action.payload.id) as FetchStatus).error = false;
            (currentState.find((status) => status.id === action.payload.id) as FetchStatus).success = true;
            (currentState.find((status) => status.id === action.payload.id) as FetchStatus).loading = false;
            (currentState.find((status) => status.id === action.payload.id) as FetchStatus).errorMessage = "";
            return currentState;
        },
        setLoading: (currentState, action:PayloadAction<Partial<FetchStatus>>) => {
            (currentState.find((status) => status.id === action.payload.id) as FetchStatus).error = false;
            (currentState.find((status) => status.id === action.payload.id) as FetchStatus).success = false;
            (currentState.find((status) => status.id === action.payload.id) as FetchStatus).loading = true;
            (currentState.find((status) => status.id === action.payload.id) as FetchStatus).errorMessage = "";
            return currentState;
        },
    },
});

// selectors
export const getFetchStatus = (id:string) => (state:RootState):FetchStatus|undefined => state.fetchStatus.find((fetchStatus) => fetchStatus.id === id);