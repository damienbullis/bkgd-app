import { useSearch } from '@tanstack/router'
import { useMemo } from 'react'

import styles from './_.module.css'
import LayerTypeSwitch from './LayerTypeSwitch'

export default function Bkgd() {
  const { layerData } = useSearch({ from: '/' })

  const layers = useMemo(() => {
    return layerData
  }, [layerData])

  return (
    <section id="bkgd" className={styles.bkgdWrap}>
      {layers.map((layer) => {
        return <LayerTypeSwitch key={layer.id} layer={layer} />
      })}
    </section>
  )
}
