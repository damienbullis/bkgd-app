import { memo } from 'react'
import {
  Bkgd,
  Footer,
  Controls,
  Layers,
  Nav,
  CapabilitiesProvider,
  VisibilityController,
} from './components'
import KeysProvider from '@state/keyEvents/KeysProvider'

const App = memo(function () {
  return (
    <main className="relative grid h-screen grid-cols-[1fr_auto_auto] grid-rows-[1fr_auto] overflow-hidden">
      <VisibilityController />
      <CapabilitiesProvider>
        <KeysProvider>
          <Bkgd />
          <Layers />
          <Controls />
          <Footer />
          <Nav />
        </KeysProvider>
      </CapabilitiesProvider>
    </main>
  )
})

export default App
