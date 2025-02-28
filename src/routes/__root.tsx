import * as React from 'react'
import {Outlet, createRootRouteWithContext} from '@tanstack/react-router'
import {AuthContext} from "../hooks/useAuth.ts";

type RouterContext = {
    authentication: AuthContext;
    apiUrl: string;
};

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
