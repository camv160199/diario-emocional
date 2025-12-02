import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isLogged, setIsLogged] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      {isLogged ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
