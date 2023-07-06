import styles from './_.module.css'
import { Button, List } from '../_shared'
import {
  At,
  CircleHalf,
  Command,
  DotsSixVertical,
  Eyedropper,
  Flask,
  Gear,
  Gradient,
  Palette,
  Plus,
  Rainbow,
  Stack,
  Toolbox,
  Trash,
} from '@phosphor-icons/react'
import { useState } from 'react'

const LayerButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <li>
      <Button>{children}</Button>
    </li>
  )
}

const LAYER_TYPES = {
  stack: Stack,
  eyedropper: Eyedropper,
  flask: Flask,
  at: At,
  circleHalf: CircleHalf,
  command: Command,
  dotsSixVertical: DotsSixVertical,
  palette: Palette,
  rainbow: Rainbow,
  gradient: Gradient,
  toolbox: Toolbox,
  gear: Gear,
}
type LayerType = keyof typeof LAYER_TYPES

const randomLayer = () => {
  const layers = Object.keys(LAYER_TYPES) as LayerType[]
  const random = Math.floor(Math.random() * layers.length)
  return layers[random]
}

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
      <List>
        {layers.map((layer, i) => {
          const Icon = LAYER_TYPES[layer]
          return (
            <li key={i} onClick={() => removeLayer(i)}>
              <Icon size={'1.618rem'} />
            </li>
          )
        })}
      </List>
    </aside>
  )
}
