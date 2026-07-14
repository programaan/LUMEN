import { createContext, useEffect, useState } from "react";

import authService from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem("access");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await authService.getProfile();
        setUser(profile);
      } 
      catch (err) {
        authService.logout();
      }
      setLoading(false);
    }

    fetchProfile();
  }, []);

  const login = async (loginData) => {
    await authService.login(loginData);
    const profile = await authService.getProfile();
    setUser(profile);
    window.dispatchEvent(new Event("storage"));
  };

  const register = async (registerData) => {
    await authService.register(registerData);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <AuthContext.Provider value={{user, loading, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  );
}