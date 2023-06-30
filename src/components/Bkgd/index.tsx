import { useState } from 'react'

export default function Bkgd() {
  // Main App Logic Here
  const [layers, setLayers] = useState([])

  return (
    <section id="bkgd">
      {layers.map((layer) => {
        return <div className="layer" />
      })}
    </section>
  )
}
