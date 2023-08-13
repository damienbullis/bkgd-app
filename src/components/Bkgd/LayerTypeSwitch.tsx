import { LayerType } from '../Layers/LayerTypeSchema'
import { SolidLayer } from './LayerTypes'

/**
 * This returns background images styles for a single layer
 */
const LayerTypeSwitch = (layer: LayerType, displayP3?: boolean) => {
  switch (layer.type) {
    case 'solid':
      return SolidLayer(layer, displayP3)
    case 'gradient':
      return ''
    case 'noise':
      return ''
    default: {
      const _exhaustiveCheck: never = layer
      return _exhaustiveCheck
    }
  }
}

export default LayerTypeSwitch
