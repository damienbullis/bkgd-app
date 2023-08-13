import { CSSProperties } from 'react'
import { useLayers } from '@state/hooks'

import LayerTypeSwitch from './LayerTypeSwitch'
import styles from './_.module.css'
import { LayerType } from '../Layers/LayerTypeSchema'

const buildLayerStyle = (layers: LayerType[]) => {
  const bkgdStyle: CSSProperties = {
    backgroundImage: '',
  }
  let i = 0
  for (const layer of layers) {
    const t = LayerTypeSwitch(layer)
    const end = i === layers.length - 1 ? '' : ', '
    bkgdStyle.backgroundImage += t + end
    i++
  }
  return bkgdStyle
}

export default function Bkgd() {
  const { layers } = useLayers()
  console.log('layers', layers)
  const bkgdStyle = buildLayerStyle(layers)
  return (
    <section id="bkgd" className={styles.bkgdWrap} style={bkgdStyle}>
      {/* 
        NOTE: bottom div is top layer of stack 
        layerData is in reverse order of layerStack for div stacking order
      */}
    </section>
  )
}
