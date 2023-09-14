import { CSSProperties } from 'react'
import { LayerType } from '@types'
import layerTypeSwitch from './layerTypeSwitch'

/**
 * Build the CSS from the layer properties
 * @param layers The layers to build the background style from
 * @returns The CSS properties object to set on the background
 */
export default function buildLayerStyle(layers: LayerType[]) {
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

    bkgdStyle.backgroundImage += layerTypeSwitch(layer) + end
    bkgdStyle.backgroundBlendMode += (layer.blendMode || 'normal') + end
    bkgdStyle.backgroundPosition += (layer.backgroundPosition || '0% 0%') + end
    bkgdStyle.backgroundSize += (layer.backgroundSize || 'auto') + end
    bkgdStyle.backgroundRepeat += (layer.backgroundRepeat || 'repeat') + end

    i++
  }
  return bkgdStyle
}
