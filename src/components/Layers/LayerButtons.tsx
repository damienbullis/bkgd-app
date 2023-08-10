import { useLayers } from '@state/hooks'
import { List } from '@shared'

import styles from './_.module.css'
import LayerButton from './Layer'

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

export default LayerButtons
