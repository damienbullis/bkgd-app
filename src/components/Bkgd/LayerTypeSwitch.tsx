import { LayerType } from '../Layers/LayerTypeSchema'
import { NoiseLayer, SolidLayer, GradientLayer } from './LayerTypes'

/**
 * This returns background images styles for a single layer
 */
const LayerTypeSwitch = (layer: LayerType, displayP3?: boolean) => {
  switch (layer.type) {
    case 'solid':
      return SolidLayer(layer, displayP3)
    case 'gradient':
      return GradientLayer(layer)
    case 'noise':
      return NoiseLayer(layer)
    default: {
      const _exhaustiveCheck: never = layer
      return _exhaustiveCheck
    }
  }
}

export default LayerTypeSwitch
