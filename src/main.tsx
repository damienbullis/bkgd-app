import React from 'react'
import ReactDOM from 'react-dom/client'
import { RootRoute, Route, Router, RouterProvider } from '@tanstack/router'
import { z } from 'zod'
import App from './App.tsx'
import './global.css'

// TODO: move code split router and routes into separate files
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
// TODO: MAIN ROUTE /[?]
// TODO: add a route for the 404 page
// TODO: /help
// TODO: /about
// TODO: /settings
// TODO: /<username>/<bkgd_id> -> redirects to /<username>/[?]

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
