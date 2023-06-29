import { RootRoute, Router } from '@tanstack/router'

import { indexRoute } from './indexRoute.ts'
// TODO: add a route for the 404 page
// TODO: /help
// TODO: /about
// TODO: /settings
// TODO: /<username>/<bkgd_id> -> redirects to /<username>/[?]

export const rootRoute = new RootRoute()
const routeTree = rootRoute.addChildren([indexRoute])

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}

const router = new Router({ routeTree })

export default router