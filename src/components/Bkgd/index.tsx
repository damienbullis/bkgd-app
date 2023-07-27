import { useSearch } from '@tanstack/router'
import { useMemo } from 'react'

import styles from './_.module.css'

export default function Bkgd() {
  // Main App Logic Here
  const { layerStack, layerData } = useSearch({ from: '/' })

  const layers = useMemo(() => {
    console.log('memo triggered')
    return layerData.sort((a, b) => {
      return layerStack.indexOf(a.id) - layerStack.indexOf(b.id)
    })
  }, [layerStack, layerData])

  console.log({ layers })
  return (
    <section id="bkgd">
      {layers.map((layer) => {
        if (layer.type === 'solid') {
          console.log(layer.props.color)
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
