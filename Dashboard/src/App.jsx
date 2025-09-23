import { useEffect, useState } from "react";
import Login from "./components/Login";
import Layout from "./components/Layout";


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  return (
    <div className="min-h-screen">
      {!user ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="flex">
          <Layout user={user} />
          {/* <Home user={user} /> */}
        </div>
      )}
    </div>
  );
};

export default App;
