import { memo } from 'react'
import { checkBrowser } from '@utils'
import { CapabilitiesProvider } from './components/Capabilities'
import { Bkgd, Footer, Controls, Layers, Nav, ErrorPage } from './components'
import VisibilityController from './components/VisibilityController'
import { setupKeyboardEvents } from '@state/keyEvents'

const App = memo(function () {
  try {
    setupKeyboardEvents(document)
    checkBrowser()
    return (
      <main className="relative grid h-screen grid-cols-[1fr_auto_auto] grid-rows-[1fr_auto]">
        <VisibilityController />
        <CapabilitiesProvider>
          <Bkgd />
          <Footer />
          <Controls />
          <Layers />
          <Nav />
        </CapabilitiesProvider>
      </main>
    )
  } catch (e) {
    console.warn(e)
    return <ErrorPage e={e as Error} />
  }
})

export default App
