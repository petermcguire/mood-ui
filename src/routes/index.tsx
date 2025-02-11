import { createFileRoute, useNavigate } from '@tanstack/react-router'
import App from "../pages/App/App.tsx";
import {login, LoginPayload} from "../services/api/apiService.ts";
import { useAuth } from "../hooks/useAuth.ts";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

const apiUrl = import.meta.env.VITE_MOOD_API_URL;

function RouteComponent() {
  const navigate = useNavigate();
  const { signIn } = useAuth()
  const handleLogin = async (username: string, password: string) => {
    const loginPayload: LoginPayload = { username, password };
    const data = await login(loginPayload, apiUrl);
    signIn(data);
    await navigate({to: '/dashboard'});
  };
  return <App handleLogin={handleLogin} />
}
