import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ApiTokenInstanceState {
  value: string | null;
}

const initialState: ApiTokenInstanceState = {
  value: localStorage.getItem("apiTokenInstance") || "",
};

export const apiTokenInstance = createSlice({
  name: "apiTokenInstance",
  initialState,
  reducers: {
    getApiTokenInstance: (state) => {
      return state;
    },
    setApiTokenInstance: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      localStorage.setItem("apiTokenInstance", action.payload);
    },
    clearApiTokenInstance: (state) => {
      state.value = "";
      localStorage.removeItem("apiTokenInstance");
    },
  },
});

export const {
  getApiTokenInstance,
  setApiTokenInstance,
  clearApiTokenInstance,
} = apiTokenInstance.actions;

export const selectApiTokenInstance = (state: {
  apiTokenInstance: ApiTokenInstanceState;
}) => state.apiTokenInstance.value;

export default apiTokenInstance.reducer;
