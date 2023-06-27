import { useSearch, useNavigate } from '@tanstack/router'
import { AppNav, LayerNav } from './navs'
import { Bkgd } from './bkgd'
import './App.css'

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
  return <h1>{title}</h1>
}

// Layout
function App() {
  return (
    // ROOT
    <main>
      <Bkgd />
      <Temp title="Footer" />
      <Temp title="Details" />
      <LayerNav />
      <AppNav />
      <Temp title="AppNav" />
      <Temp title="Help" />
      <Temp title="Spotlight**" />
      <Temp title="Splash" />
    </main>
  )
}

export default App
