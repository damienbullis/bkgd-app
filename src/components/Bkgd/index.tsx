import { useSearch } from '@tanstack/router'

import LayerTypeSwitch from './LayerTypeSwitch'
import styles from './_.module.css'

export default function Bkgd() {
  const { layerData } = useSearch({ from: '/' })
  return (
    <section id="bkgd" className={styles.bkgdWrap}>
      {/* 
        NOTE: bottom div is top layer of stack 
        layerData is in reverse order of layerStack for div stacking order
      */}
      {layerData.map((layer) => {
        return <LayerTypeSwitch key={layer.id} layer={layer} />
      })}
    </section>
  )
}
