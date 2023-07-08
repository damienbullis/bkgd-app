import styles from './_.module.css'
import { Button, List } from '../_shared'
import { useState } from 'react'
import { LayerButtons } from './LayerButton'
import { Plus, Trash } from '@phosphor-icons/react'
import { LayerType, randomLayer } from './_helpers'

export default function Layers() {
  const [layers, setLayers] = useState<LayerType[]>([])

  const addLayer = () => {
    setLayers((prev) => [...prev, randomLayer()])
  }

  const removeLayer = (index: number) => {
    setLayers((prev) => {
      const next = [...prev]
      prev.splice(index, 1)
      return next
    })
  }

  return (
    <aside id="layers" className={styles.wrap}>
      <List>
        <li>
          <Button onClick={() => addLayer()}>
            <Plus size={'1.618rem'} />
          </Button>
        </li>
        <li>
          <Button onClick={() => removeLayer(0)}>
            <Trash size={'1.618rem'} />
          </Button>
        </li>
      </List>
      <LayerButtons layers={layers} />
    </aside>
  )
}
