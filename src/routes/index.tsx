import { createFileRoute } from '@tanstack/react-router'
import App from "../pages/App/App.tsx";
import { login } from "../services/api/apiService.ts";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

const apiUrl = import.meta.env.VITE_MOOD_API_URL;

const loginWithApi = (username: string, password: string) => {
  return login({ username, password }, apiUrl);
};


function RouteComponent() {
  return <App loginService={loginWithApi} />
}
