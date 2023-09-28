import { Route } from '@tanstack/router'
import { ErrorPage, Pending, WelcomePage } from '../components'
import { rootRoute } from '.'

export const welcomeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/welcome',
  component: WelcomePage,
  pendingComponent: Pending,
  errorComponent: ErrorPage,
})
