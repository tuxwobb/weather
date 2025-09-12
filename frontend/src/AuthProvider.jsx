import { createContext, useState, useContext, useEffect } from "react";
import { getMe } from "./http";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    isActive: false,
    isAdmin: false,
  });
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      async function getUser() {
        const loggedUser = await getMe();
        setUser({
          isAuthenticated: true,
          id: loggedUser.id,
          fullname: loggedUser.fullname,
          username: loggedUser.username,
          email: loggedUser.email,
          isActive: loggedUser.active,
          isAdmin: loggedUser.admin,
        });
      }
      getUser();
    }
  }, [token]);

  const login = (user, token) => {
    setUser({
      isAuthenticated: true,
      isActive: user.active,
      isAdmin: user.admin,
    });
    setToken(token);
  };

  const logout = () => {
    setUser({ isAuthenticated: false, isActive: false, isAdmin: false });
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
