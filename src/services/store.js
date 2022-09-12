import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/slices";
import authSlice from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        data: dataSlice,
        auth: authSlice
    },
});