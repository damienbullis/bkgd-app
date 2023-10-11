import { Route } from '@tanstack/router'

import { ErrorPage, Pending } from '../components'
import { LayerSchema } from '@types'
import { rootRoute } from '.'
import App from '../App'

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search) => {
    try {
      const res = LayerSchema.parse(search)
      return res
    } catch (e) {
      console.warn('invalid search', e)
      window.location.replace(new URL(window.location.href).origin)
      return {
        layerData: [],
        layerStack: [],
      }
    }
  },
  errorComponent: ErrorPage,
  pendingComponent: Pending,
  component: App,
})
