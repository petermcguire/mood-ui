import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '../../pages/Dashboard/Dashboard.tsx'
import {allMoodsForUser} from "../../services/api/apiService.ts";

const apiUrl = import.meta.env.VITE_MOOD_API_URL;

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
  // can use loader here to load user's moods
  loader: async ( { context } ) => {
    const { getKey } = context.authentication;
    const key = getKey();
    return await allMoodsForUser(apiUrl, key.userId, key.accessToken);
  }
})

function RouteComponent() {
  return <Dashboard />
}
