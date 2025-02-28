import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './styles/index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import {useAuth} from "./hooks/useAuth.ts";

// Create a new router instance
const router = createRouter({
    routeTree,
    context: {
        authentication: undefined!,
        apiUrl: import.meta.env.VITE_MOOD_API_URL,
    }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

function RouterProviderComponent() {
    const authentication = useAuth();
    return <RouterProvider router={router} context={{ authentication }} />;
};

export default RouterProviderComponent;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProviderComponent />
  </StrictMode>,
)
