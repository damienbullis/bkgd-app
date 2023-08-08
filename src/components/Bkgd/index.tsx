import { useLayers } from '@state/hooks'

import LayerTypeSwitch from './LayerTypeSwitch'
import styles from './_.module.css'

export default function Bkgd() {
  const { layers } = useLayers()
  return (
    <section id="bkgd" className={styles.bkgdWrap}>
      {/* 
        NOTE: bottom div is top layer of stack 
        layerData is in reverse order of layerStack for div stacking order
      */}
      {layers.reverse().map((layer) => {
        if (!layer) return null
        return <LayerTypeSwitch key={layer.id} layer={layer} />
      })}
    </section>
  )
}
