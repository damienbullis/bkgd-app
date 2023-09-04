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
    return `rgba(${r}, ${g}, ${b}, ${((opacity ?? 100) / 100).toFixed(2)})`
  }
}

const transformPosition = (position?: [number, number]) => {
  if (!position) return 'center'
  return position.join('%, ') + '%'
}

const transformStop = (
  size: number | [number, number] | null,
  nullReturn = ''
) => {
  if (size === null) return nullReturn
  if (typeof size === 'number') return `${size}%`
  return size.map((s) => s + '%').join(' ')
}

const GradientLayer = (layer: GradientLayerProps, displayP3?: boolean) => {
  const repeat = layer.props.repeating ? 'repeating-' : ''
  if (layer.props.type === 'linear') {
    const deg = layer.props.deg || 0
    const space = layer.props.colorSpace || 'oklab'
    const stops =
      layer.props.stops?.map(([color, opacity, stop]) => {
        return `${getColor(color, opacity, displayP3)} ${transformStop(stop)}`
      }) || []

    return `${repeat}linear-gradient(${deg}deg in ${space}, ${stops.join(
      ', '
    )})`
  } else if (layer.props.type === 'radial') {
    const shape = layer.props.shape || 'ellipse'
    const size = transformStop(layer.props.size || null)
    const position = transformPosition(layer.props.position)
    const stops =
      layer.props.stops?.map(([color, opacity, stop]) => {
        return `${getColor(color, opacity, displayP3)} ${transformStop(stop)}`
      }) || []

    return `${repeat}radial-gradient(${shape}${size} at ${position}, ${stops.join(
      ', '
    )})`
  } else if (layer.props.type === 'conic') {
    const deg = layer.props.deg || 0
    const position = transformPosition(layer.props.position)
    const space = layer.props.colorSpace || 'oklab'
    const stops =
      layer.props.stops?.map(([color, opacity, stop]) => {
        return `${getColor(color, opacity, displayP3)} ${transformStop(stop)}`
      }) || []

    return `${repeat}conic-gradient(from ${deg}deg at ${position} in ${space}, ${stops.join(
      ', '
    )})`
  }
  return 'transparent'
}

export default GradientLayer
