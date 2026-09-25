import { useState } from "react";
import Login from "./pages/Login/Login";
import Messenger from "./pages/Messenger/Messenger";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(
      localStorage.getItem("idInstance") &&
      localStorage.getItem("apiTokenInstance"),
    ),
  );

  const handleLogin = (idInstance: string, apiTokenInstance: string) => {
    localStorage.setItem("idInstance", idInstance);
    localStorage.setItem("apiTokenInstance", apiTokenInstance);

    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("idInstance");
    localStorage.removeItem("apiTokenInstance");

    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <Messenger onLogout={handleLogout} />;
};

export default App;
