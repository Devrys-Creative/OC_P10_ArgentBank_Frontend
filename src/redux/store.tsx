import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    preloadedState: {
        user: {
            name:null,
        },
    },
    reducer: {},
});