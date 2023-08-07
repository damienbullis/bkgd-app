import { Button, List } from '@shared'

import styles from './_.module.css'
import { useMemo } from 'react'

import { CircleHalf, Gradient, Palette } from '@phosphor-icons/react'
import { LayerEnum } from '../../types/LayerType'
import { useSelectedLayer } from '@state/global'
import { useSearch } from '@tanstack/router'

const LAYER_TYPES = {
  gradient: CircleHalf,
  noise: Gradient,
  solid: Palette,
} as const

const LayerButton = ({ id, type }: { id: string; type: LayerEnum }) => {
  const Icon = LAYER_TYPES[type]
  const [selectedLayer, setSelectedLayer] = useSelectedLayer()
  const isActive = id === selectedLayer
  return (
    <Button
      className={`${isActive ? styles.active + ' ' : ''}md`}
      onClick={() => setSelectedLayer(isActive ? '' : id)}
    >
      <Icon size={'1em'} />
      <p>{type}</p>
    </Button>
  )
}

const LayerButtons = () => {
  const { layerData, layerStack } = useSearch({ from: '/' })
  const layers = useMemo(() => {
    return layerStack.map((id) => layerData.find((l) => l.id === id))
  }, [layerData, layerStack])
  return (
    <List className={styles.layers}>
      {layers.map((layer, i) => {
        if (!layer) return null
        return (
          <li key={i}>
            <LayerButton id={layer.id} type={layer.type} />
          </li>
        )
      })}
    </List>
  )
}

export { LayerButtons }
