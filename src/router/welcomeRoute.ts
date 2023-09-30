import { Route, lazy } from '@tanstack/router'
import { ErrorPage, Pending } from '../components'
import { rootRoute } from '.'

export const welcomeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/welcome',
  component: lazy(() => import('../components/Welcome')),
  pendingComponent: Pending,
  errorComponent: ErrorPage,
})
