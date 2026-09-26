import { useState } from "react";
import Login from "./pages/Login/Login";
import Messenger from "./pages/Messenger/Messenger";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCredentials,
  selectCredentials,
  setCredentials,
} from "./slice/credentialsSlice";

const App = () => {
  const { idInstance, apiTokenInstance } = useSelector(selectCredentials);
  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(idInstance && apiTokenInstance),
  );

  const handleLogin = (idInstance: string, apiTokenInstance: string) => {
    dispatch(setCredentials({ idInstance, apiTokenInstance }));

    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    dispatch(clearCredentials());

    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <Messenger onLogout={handleLogout} />;
};

export default App;
