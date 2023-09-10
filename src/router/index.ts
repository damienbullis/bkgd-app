import { RootRoute, Router } from '@tanstack/router'

import { indexRoute } from './indexRoute.ts'
import { splashRoute } from './splashRoute.ts'

export const rootRoute = new RootRoute()
const routeTree = rootRoute.addChildren([indexRoute, splashRoute])

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}

const router = new Router({ routeTree })

export default router
