import { createFileRoute, redirect } from '@tanstack/react-router'
import { jwtDecode } from "jwt-decode";

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.authentication
    if (!isLogged()) {
      throw redirect({ to: '/' })
    }
    const key = context.authentication.getKey();
    // add JWT info to context
    return jwtDecode(JSON.stringify(key));
  },
})
