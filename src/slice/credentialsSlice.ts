import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

export interface CredentialsState {
  idInstance: string;
  apiTokenInstance: string;
}

const readFromStorage = (): CredentialsState => ({
  idInstance: localStorage.getItem("idInstance") ?? "",
  apiTokenInstance: localStorage.getItem("apiTokenInstance") ?? "",
});

const credentialsSlice = createSlice({
  name: "credentials",
  initialState: readFromStorage(),
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsState>) => {
      state.idInstance = action.payload.idInstance;
      state.apiTokenInstance = action.payload.apiTokenInstance;
    },
    clearCredentials: () => ({ idInstance: "", apiTokenInstance: "" }),
  },
});

export const { setCredentials, clearCredentials } = credentialsSlice.actions;
export default credentialsSlice.reducer;

export const selectCredentials = (state: RootState) => state.credentials;
