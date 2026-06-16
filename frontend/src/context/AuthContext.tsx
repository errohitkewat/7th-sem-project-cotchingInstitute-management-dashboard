import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { api, unwrap } from "../services/api";
import type { User } from "../types";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: { name: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(() => localStorage.getItem("edumanage_token"));
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("edumanage_user");
    return raw ? JSON.parse(raw) : null;
  });

  const persist = (nextToken: string, nextUser: User) => {
    localStorage.setItem("edumanage_token", nextToken);
    localStorage.setItem("edumanage_user", JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      async login(email, password) {
        const result = await unwrap<{ token: string; user: User }>(api.post("/api/auth/login", { email, password }));
        persist(result.token, result.user);
      },
      async register(payload) {
        const result = await unwrap<{ token: string; user: User }>(api.post("/api/auth/register", payload));
        persist(result.token, result.user);
      },
      logout() {
        localStorage.removeItem("edumanage_token");
        localStorage.removeItem("edumanage_user");
        setToken(null);
        setUser(null);
      }
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
