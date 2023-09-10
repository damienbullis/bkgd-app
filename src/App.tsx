import { memo } from 'react'
import { checkBrowser } from '@utils'
import { CapabilitiesProvider } from './components/Capabilities'
import { Bkgd, Footer, Layout, Controls, Layers, Nav } from './components'
import VisibilityController from './components/VisibilityController'
import { setupKeyboardEvents } from '@state/keyEvents'

const ErrorPage = ({ e }: { e: Error }) => (
  <>
    {/* TODO: Add a better error page for future */}
    <h1>{e.message}</h1>
  </>
)

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

        {/* 
          Absolute Layers
    
          Help Layer
          Spotlight Layer
          Splash Layer
        */}
      </Layout>
    )
  } catch (e) {
    console.warn(e)
    return <ErrorPage e={e as Error} />
  }
})

export default App
