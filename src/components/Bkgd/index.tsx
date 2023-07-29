import { useSearch } from '@tanstack/router'
import { useMemo } from 'react'

import styles from './_.module.css'

export default function Bkgd() {
  // Main App Logic Here
  const { layerStack, layerData } = useSearch({ from: '/' })

  const layers = useMemo(() => {
    return layerData.sort((a, b) => {
      return layerStack.indexOf(a.id) - layerStack.indexOf(b.id)
    })
  }, [layerStack, layerData])

  return (
    <section id="bkgd">
      {layers.map((layer) => {
        if (layer.type === 'solid') {
          return (
            <div
              key={layer.id}
              className={styles.layer}
              style={{
                backgroundColor:
                  typeof layer.props.color === 'string'
                    ? layer.props.color
                    : Object.values(layer.props.color).join(', '),
              }}
            />
          )
        } else {
          return null
        }
      })}
    </section>
  )
}
