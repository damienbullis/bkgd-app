import { useSearch } from '@tanstack/router'
import { useMemo } from 'react'

import styles from './_.module.css'

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
          const bgColor = getColor(layer.props.color)
          console.log({ bgColor, layer })
          return (
            <div
              key={layer.id}
              className={styles.layer}
              style={{
                backgroundColor: bgColor,
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
