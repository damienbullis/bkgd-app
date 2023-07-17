import { Button, List } from '@shared'
import { Layer } from '@state/global'

import styles from './_.module.css'
import { useEffect, useState } from 'react'
import { LayerType } from './LayerTypeSchema'
import { CircleHalf, Gradient, Icon, Palette } from '@phosphor-icons/react'

const { ActiveLayerID } = Layer

const LAYER_TYPES: {
  [key in LayerType]: Icon
} = {
  gradient: CircleHalf,
  noise: Gradient,
  solid: Palette,
}

const LayerButton = ({ layer, id }: { layer: LayerType; id: string }) => {
  const Icon = LAYER_TYPES[layer]
  const [isActive, setActive] = useState(false)
  useEffect(() => {
    const [unsubscribe, initial] = ActiveLayerID.subscribe((id) => {
      setActive(id === layer)
    })
    setActive(initial === layer)
    return () => {
      unsubscribe()
    }
  }, [layer])

  return (
    <Button
      className={`${isActive ? styles.active + ' ' : ''}md`}
      onClick={() => ActiveLayerID.publish(isActive ? '' : id)}
    >
      <Icon size={'1em'} />
      <p>{layer}</p>
    </Button>
  )
}

const LayerButtons = ({ layers }: { layers: LayerType[] }) => {
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
