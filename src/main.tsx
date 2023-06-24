import React from 'react'
import ReactDOM from 'react-dom/client'
import { RootRoute, Route, Router, RouterProvider } from '@tanstack/router'
import { z } from 'zod'
import App from './App.tsx'
import './index.css'

const rootRoute = new RootRoute()

const bkgdSchema = z.object({
  bkgd: z.union([z.string(), z.number()]).catch((err) => {
    console.error({ err })
    return ''
  }),
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search) => bkgdSchema.parse(search),
  component: App,
})

const routeTree = rootRoute.addChildren([indexRoute])

const router = new Router({ routeTree })

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
