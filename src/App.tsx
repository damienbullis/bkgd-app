import { memo } from 'react'
import { checkBrowser } from '@utils'
import { CapabilitiesProvider } from './components/Capabilities'
import {
  Bkgd,
  Footer,
  Layout,
  Controls,
  Layers,
  Nav,
  ErrorPage,
} from './components'
import VisibilityController from './components/VisibilityController'
import { setupKeyboardEvents } from '@state/keyEvents'

const App = memo(function () {
  try {
    setupKeyboardEvents(document)
    checkBrowser()
    return (
      <Layout>
        <VisibilityController />
        <CapabilitiesProvider>
          <Bkgd />
          <Footer />
          <Controls />
          <Layers />
          <Nav />
        </CapabilitiesProvider>
      </Layout>
    )
  } catch (e) {
    console.warn(e)
    return <ErrorPage e={e as Error} />
  }
})

export default App
