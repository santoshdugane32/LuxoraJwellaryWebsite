import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  const login = (userData) => {

    // userData contains:
    // id, name, email, role, token, message

    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    // Optional: keep separate token for old code
    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const logout = () => {

    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);