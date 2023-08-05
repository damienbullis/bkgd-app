import { SolidLayerType } from '../../Layers/LayerTypeSchema'
import styles from '../_.module.css'

const getColor = (
  color:
    | string
    | Record<'r' | 'g' | 'b', number>
    | Record<'h' | 's' | 'l', number>
) => {
  if (typeof color === 'string') {
    return color
  } else if ('r' in color) {
    return `rgb(${color.r} ${color.g} ${color.b} / 1)`
  } else if ('h' in color) {
    return `hsl(${color.h} ${color.s}% ${color.l}% / 1)`
  } else {
    return 'transparent'
  }
}

const SolidLayer = ({ layer }: { layer: SolidLayerType }) => {
  const bgColor = getColor(layer.props.color)
  return (
    <div
      className={styles.layer}
      style={{
        backgroundColor: bgColor,
      }}
    />
  )
}

export default SolidLayer
