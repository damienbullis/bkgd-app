import { Route } from '@tanstack/router'
import { ErrorPage } from '../components/index.ts'
import { rootRoute } from '.'
import App from '../App.tsx'
import { LayerSchema } from '@types'

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search) => {
    try {
      const res = LayerSchema.parse(search)
      return res
    } catch (e) {
      console.warn(e)
      window.location.replace(new URL(window.location.href).origin)
      return {
        layerData: [],
        layerStack: [],
      }
    }
  },
  errorComponent: ({ error }) => <ErrorPage e={error} />,
  component: App,
})
