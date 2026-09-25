import { useState } from "react";
import Login from "./pages/Login/Login";
import Messenger from "./pages/Messenger/Messenger";
import { useDispatch, useSelector } from "react-redux";
import {
  clearApiTokenInstance,
  selectApiTokenInstance,
  setApiTokenInstance,
} from "./slice/apiTokenInstanceSlice";
import {
  clearIdInstance,
  selectIdInstance,
  setIdInstance,
} from "./slice/idInstanceSlice";

const App = () => {
  const apiTokenInstance = useSelector(selectApiTokenInstance);
  const idInstance = useSelector(selectIdInstance);
  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(idInstance && apiTokenInstance),
  );

  const handleLogin = (idInstance: string, apiTokenInstance: string) => {
    dispatch(setIdInstance(idInstance));
    dispatch(setApiTokenInstance(apiTokenInstance));

    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    dispatch(clearIdInstance());
    dispatch(clearApiTokenInstance());

    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <Messenger onLogout={handleLogout} />;
};

export default App;
