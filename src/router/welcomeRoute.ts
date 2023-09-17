import { Route } from '@tanstack/router'
import { rootRoute } from '.'
import WelcomePage from '../components/Welcome'

export const welcomeRoute = new Route({
  getParentRoute: () => rootRoute,
  component: WelcomePage,
  path: '/welcome',
})
