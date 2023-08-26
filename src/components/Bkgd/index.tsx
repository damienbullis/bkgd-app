import { CSSProperties } from 'react'
import { useLayers } from '@state/hooks'

import LayerTypeSwitch from './LayerTypeSwitch'
import styles from './_.module.css'
import { LayerType } from '../Layers/LayerTypeSchema'

const buildLayerStyle = (layers: LayerType[]) => {
  const bkgdStyle: CSSProperties = {
    backgroundImage: '',
    backgroundBlendMode: '',
    backgroundPosition: '',
    backgroundSize: '',
    backgroundRepeat: '',
  }
  let i = 0
  for (const layer of layers) {
    const t = LayerTypeSwitch(layer)
    if (layer.type === 'gradient' && layer.props.type === 'conic') {
      console.log('conic', { layer, t })
    }
    const end = i === layers.length - 1 ? '' : ', '
    bkgdStyle.backgroundImage += t + end
    bkgdStyle.backgroundBlendMode += (layer.blendMode || 'normal') + end
    bkgdStyle.backgroundPosition += (layer.backgroundPosition || '0% 0%') + end
    bkgdStyle.backgroundSize += (layer.backgroundSize || 'auto') + end
    bkgdStyle.backgroundRepeat += (layer.backgroundRepeat || 'repeat') + end
    i++
  }
  return bkgdStyle
}

export default function Bkgd() {
  const { layers } = useLayers()
  console.log('layers', layers)
  const bkgdStyle = buildLayerStyle(layers)
  return (
    <section id="bkgd" className={styles.bkgdWrap} style={bkgdStyle}></section>
  )
}
