import { hexToRGB } from '../../../utils/colorHelpers'
import {
  GradientLayerType,
  SharedLayerPropsSchemaType,
} from '../../Layers/LayerTypeSchema'

type GradientLayerProps = GradientLayerType & SharedLayerPropsSchemaType

const getColor = (
  color:
    | string
    | { r: number; g: number; b: number }
    | { h: number; s: number; l: number },
  opacity: number | null
) => {
  if (typeof color === 'string') {
    // reduce to rgba()
    const { r, g, b } = hexToRGB(color)
    return `rgba(${r}, ${g}, ${b}, ${opacity ?? 1})`
  }
}

const GradientLayer = (layer: GradientLayerProps) => {
  console.log('GradientLayer', { layer })
  if (layer.props.type === 'linear') {
    return `linear-gradient(${layer.props.deg || 0}deg in ${
      layer.props.colorSpace || 'oklab'
    }, ${layer.props.stops?.map(([color, opacity, stop]) => {
      return `${getColor(color, opacity)} ${
        stop
          ? `${
              typeof stop === 'number'
                ? `${stop}%`
                : stop.map((s) => s + '%').join(' ')
            }`
          : ''
      }`
    })})`
  }
}

export default GradientLayer
