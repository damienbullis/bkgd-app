import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const DownloadButton = () => {
  return <button onClick={() => console.log('clicked!')}>Test</button>
}

function App() {
  return (
    <>
      <div id="test">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <h1 style={{ color: 'red', filter: 'blur(10px)' }}>TEst</h1>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <DownloadButton />
    </>
  )
}

export default App
