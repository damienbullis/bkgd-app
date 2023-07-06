// import { useSearch, useNavigate } from '@tanstack/router'
import Layers from './components/Layers'
import Nav from './components/Nav'
import Bkgd from './components/Bkgd'
import Footer from './components/Footer'
import Controls from './components/Controls'
import Layout from './components/Layout'

const PointerProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: add context for pointer
  // This will be used for the dynamic behavior
  // when dragging elements from layers to controls
  return <>{children}</>
}

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

export default function App() {
  return (
    <Layout>
      <Bkgd />
      <Footer />
      <PointerProvider>
        <Controls />
        <Layers />
      </PointerProvider>
      <Nav />

      {/* 
      Absolute Layers

      Help Layer
      Spotlight Layer
      Splash Layer
      */}
    </Layout>
  )
}
