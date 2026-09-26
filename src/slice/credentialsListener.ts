import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setCredentials, clearCredentials } from "./credentialsSlice";

export const credentialsListener = createListenerMiddleware();

credentialsListener.startListening({
  actionCreator: setCredentials,
  effect: (action) => {
    localStorage.setItem("idInstance", action.payload.idInstance);
    localStorage.setItem("apiTokenInstance", action.payload.apiTokenInstance);
  },
});

credentialsListener.startListening({
  actionCreator: clearCredentials,
  effect: () => {
    localStorage.removeItem("idInstance");
    localStorage.removeItem("apiTokenInstance");
  },
});
