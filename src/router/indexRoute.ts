import { Route } from '@tanstack/router'
import { z } from 'zod'

import { rootRoute } from './index.ts'
import App from '../App.tsx'


export const bkgdSchema = z.object({
  bkgd: z.union([z.string(), z.number(), z.null()]).catch((err) => {
    // TODO: add error handler utility
    console.warn(err.error.issues)
    return null
  }),
})

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search) => bkgdSchema.parse(search),
  component: App,
})