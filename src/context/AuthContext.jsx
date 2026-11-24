import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const AuthContext = createContext(null);

// Demo-only auth: users live in localStorage. Replace with a real backend later.
const ADMIN = { name: "Admin", email: "admin@shopnest.com", password: "admin123", role: "admin" };

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage("shopnest_users", [ADMIN]);
  const [user, setUser] = useLocalStorage("shopnest_session", null);

  const signup = ({ name, email, password }) => {
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
      return { ok: false, error: "An account with this email already exists." };
    const newUser = { name, email, password, role: "user", addresses: [] };
    setUsers((prev) => [...prev, newUser]);
    setUser({ name, email, role: "user" });
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: "Invalid email or password." };
    setUser({ name: found.name, email: found.email, role: found.role });
    return { ok: true };
  };

  const logout = () => setUser(null);

  const updateProfile = (name) => {
    setUsers((prev) => prev.map((u) => (u.email === user.email ? { ...u, name } : u)));
    setUser((prev) => ({ ...prev, name }));
  };

  const value = useMemo(
    () => ({ user, isAdmin: user?.role === "admin", signup, login, logout, updateProfile }),
    [user, users]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
