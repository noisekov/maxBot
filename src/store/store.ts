import { configureStore } from "@reduxjs/toolkit";
import apiTokenInstance from "../slice/apiTokenInstanceSlice";
import idInstance from "../slice/idInstanceSlice";

export const store = configureStore({
  reducer: {
    apiTokenInstance,
    idInstance,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
