import { RootRoute, Router } from '@tanstack/router'

import { indexRoute } from './indexRoute.tsx'
import { welcomeRoute } from './welcomeRoute.ts'
import { ErrorPage } from '../components'

export const rootRoute = new RootRoute({
  beforeLoad: async ({ router }) => {
    const checkPath = router.state.currentLocation.pathname === indexRoute.path
    const returningUser = localStorage.getItem('visited') === 'true'
    if (
      checkPath &&
      !returningUser &&
      !router.state.currentLocation.searchStr
    ) {
      localStorage.setItem('visited', 'true')
      await router.navigate({
        to: welcomeRoute.path,
      })
    }
  },
  errorComponent: ErrorPage,
})
const routeTree = rootRoute.addChildren([indexRoute, welcomeRoute])

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}

const router = new Router({ routeTree })

export default router
