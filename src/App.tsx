import { memo } from 'react'
import { checkBrowser } from '@utils'
import { CapabilitiesProvider } from './components/Capabilities'
import { Bkgd, Footer, Layout, Controls, Layers, Nav } from './components'

// const DownloadButton = () => {
//   const nav = useNavigate({ from: '/' })
//   return (
//     <button
//       onClick={() =>
//         nav({ search: { bkgd: (Math.random() * 100).toFixed(0) } })
//       }
//     >
//       TEST
//     </button>
//   )
// }

// function App() {
//   const { bkgd } = useSearch({
//     from: '/',
//   })
//   console.log({ bkgd })
//   return (
//     <div className="wrap">
//       <div id="test">{/* <img src={Noise} alt="noise" /> */}</div>
//       {/* <DownloadButton /> */}
//     </div>
//   )
// }

const memApp = memo(function () {
  try {
    checkBrowser()
    return (
      <Layout>
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

export default memApp
