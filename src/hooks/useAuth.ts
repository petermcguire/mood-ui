import {LoginResponse} from "../services/api/apiService.ts";

export const key = "loginResponse";

export const useAuth = () => {
  const signIn = (loginResponse: LoginResponse) => {
    localStorage.setItem(key, JSON.stringify(loginResponse));
  };

  const signOut = () => {
    localStorage.removeItem(key);
  };

  const isLogged = () => localStorage.getItem(key) != null;

  const getKey = () => {
    const localKey = localStorage.getItem(key);
    if (localKey != null) return JSON.parse(localKey);
    else return null;
  };

  return { signIn, signOut, isLogged, getKey };
};

export type AuthContext = ReturnType<typeof useAuth>;
