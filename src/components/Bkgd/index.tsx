import { useLayers } from '@state/hooks'
import buildLayerStyle from './buildLayerStyle'
import { useDeferredValue } from 'react'

export default function Bkgd() {
  const { layers } = useLayers()
  const deferredLayers = useDeferredValue(layers)
  // console.log('layers', deferredLayers)
  return (
    <section
      id="bkgd"
      className="relative isolate -z-10 col-span-full row-span-full overflow-hidden"
      style={buildLayerStyle(deferredLayers)}
    ></section>
  )
}
