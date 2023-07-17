import { Route } from '@tanstack/router'
import { LayerSchema } from '../components/Layers/LayerTypeSchema.ts'
import { rootRoute } from './index.ts'
import App from '../App.tsx'

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search) => LayerSchema.parse(search),
  component: App,
})
