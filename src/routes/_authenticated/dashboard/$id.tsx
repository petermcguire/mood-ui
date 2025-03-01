import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '../../../pages/Dashboard/Dashboard.tsx'
import ApiService, {Mood} from "../../../services/api/apiService.ts";


export const Route = createFileRoute(
    '/_authenticated/dashboard/$id'
)({
  component: RouteComponent,
  // can use loader here to load user's moods
  loader: async () => {
    let moods = await ApiService.allMoodsForUser();
    // sort it
    moods = moods.sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf());
    return moods;
  }
})

function RouteComponent() {
  const moods = Route.useLoaderData();
  const handleMoodSubmit = async (mood: Mood) => {
    return await ApiService.addMood(mood);
  }
  return <Dashboard data={moods} handleMoodSubmit={handleMoodSubmit} />
}
