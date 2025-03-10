import * as React from 'react'
import {Outlet, createRootRouteWithContext} from '@tanstack/react-router'
import {AuthContext} from "../hooks/useAuth.ts";

interface RouterContext {
    authentication: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
