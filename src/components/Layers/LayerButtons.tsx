import { Button, List } from '../_shared'
import { LAYER_TYPES, LayerType } from './_helpers'
import styles from './_.module.css'

const LayerButton = ({ layer }: { layer: LayerType }) => {
  const Icon = LAYER_TYPES[layer]
  return (
    <Button className="md">
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
