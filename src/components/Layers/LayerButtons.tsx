import { Button, List } from '@shared'

import styles from './_.module.css'
import { useMemo } from 'react'

import { CircleHalf, Gradient, Icon, Palette } from '@phosphor-icons/react'
import { LayerEnum } from '../../types/LayerType'
import { useSelectedLayer } from '@state/global'

const LAYER_TYPES: {
  [key in LayerEnum]: Icon
} = {
  gradient: CircleHalf,
  noise: Gradient,
  solid: Palette,
}

const LayerButton = ({ layer, id }: { layer: LayerEnum; id: string }) => {
  const Icon = LAYER_TYPES[layer]
  const [selectedLayer, setSelectedLayer] = useSelectedLayer()
  const isActive = useMemo(
    () => selectedLayer === layer,
    [selectedLayer, layer]
  )

  return (
    <Button
      className={`${isActive ? styles.active + ' ' : ''}md`}
      onClick={() => setSelectedLayer(isActive ? '' : id)}
    >
      <Icon size={'1em'} />
      <p>{layer}</p>
    </Button>
  )
}

const LayerButtons = ({ layers }: { layers: LayerEnum[] }) => {
  return (
    <List className={styles.layers}>
      {layers.map((layer, i) => (
        <li key={i}>
          <LayerButton layer={layer} id={layer} />
        </li>
      ))}
    </List>
  )
}

export { LayerButtons }
