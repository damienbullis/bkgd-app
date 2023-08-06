import { useSearch } from '@tanstack/router'
import { useMemo } from 'react'

import styles from './_.module.css'
import LayerTypeSwitch from './LayerTypeSwitch'

export default function Bkgd() {
  const { layerStack, layerData } = useSearch({ from: '/' })

  const layers = useMemo(() => {
    return layerData.sort((a, b) => {
      return layerStack.indexOf(a.id) - layerStack.indexOf(b.id)
    })
  }, [layerStack, layerData])

  return (
    <section id="bkgd" className={styles.bkgdWrap}>
      {layers.map((layer) => {
        return <LayerTypeSwitch key={layer.id} layer={layer} />
      })}
    </section>
  )
}
