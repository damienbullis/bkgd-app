import { Button, List } from '@shared'
import { SelectedLayerID } from '@state/global'
import { LAYER_TYPES, LayerType } from './_helpers'
import styles from './_.module.css'
import { useEffect, useState } from 'react'

const LayerButton = ({ layer }: { layer: LayerType }) => {
  const Icon = LAYER_TYPES[layer]
  const [isActive, setActive] = useState(SelectedLayerID.getState() === layer)
  useEffect(() => {
    const unsubscribe = SelectedLayerID.subscribe((id) => {
      setActive(id === layer)
    })
    return () => {
      unsubscribe()
    }
  }, [layer])

  return (
    <Button
      className={`${isActive ? styles.active + ' ' : ''}md`}
      onClick={() =>
        SelectedLayerID.setState(
          SelectedLayerID.getState() === layer ? '' : layer
        )
      }
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
          <LayerButton layer={layer} />
        </li>
      ))}
    </List>
  )
}

export { LayerButtons }
