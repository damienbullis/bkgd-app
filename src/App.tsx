import { useSearch, useNavigate } from '@tanstack/router'
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

function App() {
  return (
    // ROOT
    <main>
      <section>
        <Temp title="AppNav" />
        <Temp title="LayerNav" />
        <Temp title="Details" />
        <Temp title="Bkgd" />
        <Temp title="Help" />
        <Temp title="Spotlight**" />
        <Temp title="Footer" />
        <Temp title="Splash" />
      </section>
    </main>
  )
}

export default App
