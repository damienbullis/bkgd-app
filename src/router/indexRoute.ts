import { Route } from '@tanstack/router'
import { rootRoute } from './index.ts'
import App from '../App.tsx'
import { BkgdSchema } from '../components/Layers/LayerTypes.ts'

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search) => BkgdSchema.parse(search),
  component: App,
})
