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
  opacity: number | null,
  displayP3?: boolean
) => {
  if (typeof color === 'string') {
    // reduce to rgba()
    const { r, g, b } = hexToRGB(color, displayP3)
    return `rgba(${r}, ${g}, ${b}, ${opacity ?? 1})`
  }
}

const GradientLayer = (layer: GradientLayerProps, displayP3?: boolean) => {
  console.log('GradientLayer', { layer })
  const repeat = layer.props.repeating ? 'repeating-' : ''
  if (layer.props.type === 'linear') {
    const deg = layer.props.deg || 0
    const space = layer.props.colorSpace || 'oklab'
    const stops =
      layer.props.stops?.map(([color, opacity, stop]) => {
        return `${getColor(color, opacity, displayP3)} ${
          stop
            ? `${
                typeof stop === 'number'
                  ? `${stop}%`
                  : stop.map((s) => s + '%').join(' ')
              }`
            : ''
        }`
      }) || []
    return `${repeat}linear-gradient(${deg}deg in ${space}, ${stops.join(
      ', '
    )})`
  } else if (layer.props.type === 'radial') {
    const shape = layer.props.shape || 'ellipse'
    const size = layer.props.size
      ? typeof layer.props.size === 'number'
        ? ` ${layer.props.size}%`
        : ' ' + layer.props.size.map((s) => s + '%').join(' ')
      : ''
    const position = layer.props.position || 'center'
    const stops =
      layer.props.stops?.map(([color, opacity, stop]) => {
        return `${getColor(color, opacity, displayP3)} ${
          stop
            ? `${
                typeof stop === 'number'
                  ? `${stop}%`
                  : stop.map((s) => s + '%').join(' ')
              }`
            : ''
        }`
      }) || []
    return `${repeat}radial-gradient(${shape}${size} at ${position}, ${stops.join(
      ', '
    )})`
  } else if (layer.props.type === 'conic') {
    const deg = layer.props.deg || 0
    const position = layer.props.position || 'center'
    const space = layer.props.colorSpace || 'oklab'
    const stops =
      layer.props.stops?.map(([color, opacity, stop]) => {
        return `${getColor(color, opacity, displayP3)} ${
          stop
            ? typeof stop === 'number'
              ? `${stop}deg`
              : stop.map((s) => s + 'deg').join(' ')
            : ''
        }`
      }) || []
    return `${repeat}conic-gradient(from ${deg}deg in ${space} at ${position}, ${stops.join(
      ', '
    )})`
  }
}

export default GradientLayer
