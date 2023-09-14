import { useLayers } from '@state/hooks'
import buildLayerStyle from './buildLayerStyle'

export default function Bkgd() {
  const { layers } = useLayers()
  console.log('layers', layers)
  return (
    <section
      id="bkgd"
      className="relative isolate -z-10 col-span-full row-span-full overflow-hidden"
      style={buildLayerStyle(layers)}
    ></section>
  )
}
