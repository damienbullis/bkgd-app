// import { useSearch, useNavigate } from '@tanstack/router'
import Layers from './components/Layers'
import Nav from './components/Nav'
import Bkgd from './components/Bkgd'
import Footer from './components/Footer'
import Controls from './components/Controls'
import Layout from './components/Layout'

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

const Temp = ({ title }: { title: string }) => {
  return <h1 className="test">{title}</h1>
}

// Layout
function App() {
  return (
    <Layout>
      <Bkgd />
      <Footer />
      <Controls />
      <Layers />
      <Nav />

      {/* 
      Absolute Layers
      <Temp title="Help" />
      <Temp title="Spotlight**" />
      <Temp title="Splash" /> 
      */}
    </Layout>
  )
}

export default App
