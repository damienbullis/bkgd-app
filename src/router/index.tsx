import { RootRoute, Router } from '@tanstack/router'

import { indexRoute } from './indexRoute.tsx'
import { splashRoute } from './splashRoute.ts'
import ErrorPage from '../components/ErrorPage.tsx'

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
  errorComponent: ({ error }) => <ErrorPage e={error} />,
})
const routeTree = rootRoute.addChildren([indexRoute, splashRoute])

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}

const router = new Router({ routeTree })

export default router
