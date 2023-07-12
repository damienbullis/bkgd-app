import styles from './_.module.css'
import { Button, List } from '../_shared'
import { useState } from 'react'
import { LayerButtons } from './LayerButtons'
import {
  Clipboard,
  DownloadSimple,
  Eye,
  EyeClosed,
  // Plus,
  // Trash,
} from '@phosphor-icons/react'
import { LayerType, randomLayer } from './_helpers'

const VisibilityButton = () => {
  const [hide, setHide] = useState(false)
  return (
    <Button onClick={() => setHide((prev) => !prev)}>
      {hide ? <EyeClosed size={'1.618rem'} /> : <Eye size={'1.618rem'} />}
    </Button>
  )
}

export default function Layers() {
  const [layers, setLayers] = useState<LayerType[]>([randomLayer()])

  // const addLayer = () => {
  //   setLayers((prev) => [...prev, randomLayer()])
  // }

  // const removeLayer = (index: number) => {
  //   setLayers((prev) => {
  //     const next = [...prev]
  //     prev.splice(index, 1)
  //     return next
  //   })
  // }

  return (
    <aside id="layers" className={styles.wrap}>
      <List>
        <li>
          <Button>
            <DownloadSimple size={'1.618rem'} />
          </Button>
        </li>
        <li>
          <Button>
            <Clipboard size={'1.618rem'} />
          </Button>
        </li>
        {/* <li>
          <Button onClick={() => addLayer()}>
            <Plus size={'1.618rem'} />
          </Button>
        </li>
        <li>
          <Button onClick={() => removeLayer(0)}>
            <Trash size={'1.618rem'} />
          </Button>
        </li> */}
        <li>
          <VisibilityButton />
        </li>
      </List>
      <LayerButtons layers={layers} />
    </aside>
  )
}
