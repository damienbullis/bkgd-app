import { LayerType } from '@types'
import { NoiseLayer, SolidLayer, GradientLayer } from '.'

/**
 * This returns background images styles for a single layer
 */
export default function LayerTypeSwitch(layer: LayerType, displayP3?: boolean) {
  switch (layer.type) {
    case 'solid':
      return SolidLayer(layer, displayP3)
    case 'gradient':
      return GradientLayer(layer, displayP3)
    case 'noise':
      return NoiseLayer(layer)
    default: {
      const _exhaustiveCheck: never = layer
      return _exhaustiveCheck
    }
  }
}
