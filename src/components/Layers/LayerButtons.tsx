import { Button, List } from '@shared'

import styles from './_.module.css'
import { useMemo } from 'react'

import { CircleHalf, Gradient, Icon, Palette } from '@phosphor-icons/react'
import { LayerEnum } from '../../types/LayerType'
import { useSelectedLayer } from '@state/global'
import { useSearch } from '@tanstack/router'

const LAYER_TYPES: {
  [key in LayerEnum]: Icon
} = {
  gradient: CircleHalf,
  noise: Gradient,
  solid: Palette,
}

const LayerButton = ({ id }: { id: string }) => {
  const { layerData } = useSearch({ from: '/' })
  const layer = useMemo(
    () => layerData.find((layer) => layer.id === id),
    [layerData, id]
  )
  const Icon = LAYER_TYPES[layer?.type || 'solid']
  const [selectedLayer, setSelectedLayer] = useSelectedLayer()
  const isActive = useMemo(
    () => selectedLayer === layer?.id,
    [selectedLayer, layer]
  )
  console.log({ layer, selectedLayer, isActive })
  return (
    <Button
      className={`${isActive ? styles.active + ' ' : ''}md`}
      onClick={() => setSelectedLayer(isActive ? '' : id)}
    >
      <Icon size={'1em'} />
      <p>{layer?.type}</p>
    </Button>
  )
}

const LayerButtons = () => {
  const { layerStack } = useSearch({ from: '/' })
  return (
    <List className={styles.layers}>
      {layerStack.map((layer, i) => (
        <li key={i}>
          <LayerButton id={layer} />
        </li>
      ))}
    </List>
  )
}

export { LayerButtons }
