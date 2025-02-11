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

  return { signIn, signOut, isLogged };
};

export type AuthContext = ReturnType<typeof useAuth>;
