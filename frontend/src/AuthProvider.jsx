import { createContext, useState, useContext, useEffect } from "react";
import { getMe } from "./http";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    fullname: null,
    username: null,
    email: null,
    isActive: false,
    roles: [],
  });
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      async function getUser() {
        const loggedUser = await getMe();
        setUser({
          id: loggedUser.id,
          fullname: loggedUser.fullname,
          username: loggedUser.username,
          email: loggedUser.email,
          isActive: loggedUser.active,
          roles: loggedUser.roles,
        });
      }
      getUser();
    }
  }, [token]);

  const login = (user, token) => {
    setUser({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      isActive: user.active,
      roles: user.roles,
    });
    setToken(token);
  };

  const logout = () => {
    setUser({
      id: null,
      fullname: null,
      username: null,
      email: null,
      isActive: false,
      roles: [],
    });
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
