import { memo } from 'react'
import { checkBrowser } from '@utils'
import { CapabilitiesProvider } from './components/Capabilities'
import { Bkgd, Footer, Layout, Controls, Layers, Nav } from './components'
import VisibilityController from './components/VisibilityController'

const App = memo(function () {
  try {
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
    return (
      <>
        {/* TODO: Add a better error page for future */}
        <h1>{(e as Error).message}</h1>
      </>
    )
  }
})

export default App
