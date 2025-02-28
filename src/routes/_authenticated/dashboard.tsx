import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '../../pages/Dashboard/Dashboard.tsx'
import {addMood, allMoodsForUser, Mood} from "../../services/api/apiService.ts";


export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
  // can use loader here to load user's moods
  loader: async ( { context } ) => {
    const { getKey } = context.authentication;
    const key = getKey();
    let moods = await allMoodsForUser(key.userId, key.accessToken);
    // sort it
    moods = moods.sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf());
    return moods;
  }
})

function RouteComponent() {
  const moods = Route.useLoaderData();
  const {userId} = Route.useParams();
  const handleMoodSubmit = async (mood: Mood) => {
    return await addMood(mood, Route.useParams());
  }
  return <Dashboard userId={userId} data={moods} handleMoodSubmit={handleMoodSubmit} />
}
