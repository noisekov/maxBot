import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ApiIdInstanceState {
  value: string | null;
}

const initialState: ApiIdInstanceState = {
  value: localStorage.getItem("idInstance") || "",
};

export const idInstance = createSlice({
  name: "idInstance",
  initialState,
  reducers: {
    getIdInstance: (state) => {
      return state;
    },
    setIdInstance: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      localStorage.setItem("idInstance", action.payload);
    },
    clearIdInstance: (state) => {
      state.value = "";
      localStorage.removeItem("idInstance");
    },
  },
});

export const { getIdInstance, setIdInstance, clearIdInstance } =
  idInstance.actions;

export const selectIdInstance = (state: { idInstance: ApiIdInstanceState }) =>
  state.idInstance.value;

export default idInstance.reducer;
