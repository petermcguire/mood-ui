import {createFileRoute, useNavigate } from '@tanstack/react-router'
import App from "../pages/App/App.tsx";
import {login } from "../services/api/apiService.ts";
import { useAuth } from "../hooks/useAuth.ts";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

const apiUrl = import.meta.env.VITE_MOOD_API_URL;

function RouteComponent() {
  const navigate = useNavigate();
  const { signIn } = useAuth()
  const handleLogin = async (username: string, password: string) => {
    const data = await login({ username, password }, apiUrl);
    console.log('Login successful:', data);
    signIn(data);
    await navigate({to: '/dashboard'});
  };
  return <App handleLogin={handleLogin} />
}
