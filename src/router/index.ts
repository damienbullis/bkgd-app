import { RootRoute, Router } from '@tanstack/router'

import { indexRoute } from './indexRoute.ts'
import { splashRoute } from './splashRoute.ts'

export const rootRoute = new RootRoute({
  beforeLoad: ({ router }) => {
    const checkPath = router.state.latestLocation.pathname === indexRoute.path
    const returningUser = localStorage.getItem('visited') === 'true'
    if (checkPath && !returningUser) {
      localStorage.setItem('visited', 'true')
      router.navigate({
        to: splashRoute.path,
      })
    }
  },
})
const routeTree = rootRoute.addChildren([indexRoute, splashRoute])

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}

const router = new Router({ routeTree })

export default router
