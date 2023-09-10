import { CSSProperties } from 'react'
import { useLayers } from '@state/hooks'

import LayerTypeSwitch from './LayerTypeSwitch'
import { LayerType } from '../Layers/LayerTypeSchema'

/**
 * Build the CSS from the layer properties
 * @param layers The layers to build the background style from
 * @returns The CSS properties object to set on the background
 */
const buildLayerStyle = (layers: LayerType[]) => {
  const bkgdStyle: CSSProperties = {
    backgroundImage: '',
    backgroundBlendMode: '',
    backgroundPosition: '',
    backgroundSize: '',
    backgroundRepeat: '',
  }
  let i = 0
  for (const layer of layers) {
    const end = i === layers.length - 1 ? '' : ', '

    bkgdStyle.backgroundImage += LayerTypeSwitch(layer) + end
    bkgdStyle.backgroundBlendMode += (layer.blendMode || 'normal') + end
    bkgdStyle.backgroundPosition += (layer.backgroundPosition || '0% 0%') + end
    bkgdStyle.backgroundSize += (layer.backgroundSize || 'auto') + end
    bkgdStyle.backgroundRepeat += (layer.backgroundRepeat || 'repeat') + end

    i++
  }
  return bkgdStyle
}

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
