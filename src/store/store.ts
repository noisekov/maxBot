import { configureStore } from "@reduxjs/toolkit";
import credentialsReducer from "../slice/credentialsSlice";
import { credentialsListener } from "../slice/credentialsListener";

export const store = configureStore({
  reducer: {
    credentials: credentialsReducer,
  },
  middleware: (getDefault) =>
    getDefault().prepend(credentialsListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
