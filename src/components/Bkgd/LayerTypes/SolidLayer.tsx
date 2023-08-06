import { CSSProperties } from 'react'
import {
  SharedLayerPropsSchemaType,
  SolidLayerType,
} from '../../Layers/LayerTypeSchema'
import styles from '../_.module.css'
import { useCapabilities } from '../../Capabilities'

const getColor = (
  color:
    | string
    | Record<'r' | 'g' | 'b', number>
    | Record<'h' | 's' | 'l', number>,
  useP3 = false
) => {
  if (typeof color === 'string') {
    return color
  } else if ('r' in color) {
    return `${useP3 ? 'color(display-p3' : 'rgb('}${color.r} ${color.g} ${
      color.b
    } / 1)`
  } else if ('h' in color) {
    return `hsl(${color.h} ${color.s}% ${color.l}% / 1)`
  } else {
    return 'transparent'
  }
}

type SolidLayerProps = SolidLayerType & SharedLayerPropsSchemaType

const SolidLayer = ({ layer }: { layer: SolidLayerProps }) => {
  const { displayP3 } = useCapabilities()
  const style: CSSProperties = {
    backgroundColor: getColor(
      layer.props.color,
      (displayP3 as boolean) || false
    ),
    opacity: layer.opacity,
    [layer.backgroundBlend ? 'backgroundBlendMode' : 'mixBlendMode']:
      layer.blendMode,
    backgroundPosition: layer.backgroundPosition,
    backgroundSize: layer.backgroundSize,
  }
  return <div className={styles.layer} style={style} />
}

export default SolidLayer
