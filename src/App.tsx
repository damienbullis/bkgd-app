import { useSearch, useNavigate } from '@tanstack/router'
import './App.css'

const DownloadButton = () => {
  const nav = useNavigate({ from: '/' })
  return (
    <button
      onClick={() =>
        nav({ search: { bkgd: (Math.random() * 100).toFixed(0) } })
      }
    >
      TEST
    </button>
  )
}

function App() {
  const { bkgd } = useSearch({
    from: '/',
  })
  console.log({ bkgd })
  return (
    <>
      <div id="test">{bkgd}</div>
      <DownloadButton />
    </>
  )
}

export default App
