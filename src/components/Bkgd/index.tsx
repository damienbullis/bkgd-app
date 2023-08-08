import { useSearch } from '@tanstack/router'

import LayerTypeSwitch from './LayerTypeSwitch'
import styles from './_.module.css'
import { useMemo } from 'react'

export default function Bkgd() {
  const { layerStack, layerData } = useSearch({ from: '/' })
  const layers = useMemo(() => {
    return layerStack.map((l) => layerData.find((d) => d.id === l)).reverse()
  }, [layerStack, layerData])
  return (
    <section id="bkgd" className={styles.bkgdWrap}>
      {/* 
        NOTE: bottom div is top layer of stack 
        layerData is in reverse order of layerStack for div stacking order
      */}
      {layers.map((layer) => {
        if (!layer) return null
        return <LayerTypeSwitch key={layer.id} layer={layer} />
      })}
    </section>
  )
}
