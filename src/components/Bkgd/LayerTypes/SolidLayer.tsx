import {
  SharedLayerPropsSchemaType,
  SolidLayerType,
} from '../../Layers/LayerTypeSchema'

const getColor = (
  color:
    | string
    | Record<'r' | 'g' | 'b', number>
    | Record<'h' | 's' | 'l', number>,
  opacity = 100,
  useP3 = false
) => {
  if (typeof color === 'string') {
    const o = String(opacity)
    return color + (o.length === 3 ? '' : o)
  } else if ('r' in color) {
    return `${useP3 ? 'color(display-p3' : 'rgb('}${color.r} ${color.g} ${
      color.b
    } / ${opacity / 100})`
  } else if ('h' in color) {
    return `hsl(${color.h} ${color.s}% ${color.l}% / ${opacity / 100})`
  } else {
    return 'transparent'
  }
}

type SolidLayerProps = SolidLayerType & SharedLayerPropsSchemaType

const SolidLayer = (layer: SolidLayerProps, displayP3?: boolean) => {
  const color = getColor(layer.props.color, layer.opacity, displayP3)
  return `linear-gradient(0deg, ${color}, ${color})`
}

export default SolidLayer
