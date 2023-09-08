import { Route } from '@tanstack/router'
import { rootRoute } from '.'
import SplashPage from '../components/SplashPage'

export const splashRoute = new Route({
  getParentRoute: () => rootRoute,
  component: SplashPage,
  path: '/welcome',
})
