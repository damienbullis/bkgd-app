import { CircleHalf, Gradient, Palette } from '@phosphor-icons/react'
import { useLayers } from '@state/hooks'
import { Button, List } from '@shared'

import { LayerEnum } from '../../types/LayerType'
import styles from './_.module.css'

const LAYER_TYPES = {
  gradient: CircleHalf,
  noise: Gradient,
  solid: Palette,
} as const

const LayerButton = ({ id, type }: { id: string; type: LayerEnum }) => {
  const Icon = LAYER_TYPES[type]
  const { selectedLayer, setSelectedLayer } = useLayers()
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
  const { layers } = useLayers()
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
