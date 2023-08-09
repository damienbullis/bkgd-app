import {
  ArrowBendLeftUp,
  ArrowBendRightDown,
  CircleHalf,
  DotsThreeOutlineVertical,
  Gradient,
  Palette,
  TrashSimple,
} from '@phosphor-icons/react'
import { useLayers } from '@state/hooks'
import { Button, IconButton, List } from '@shared'

import { LayerEnum } from '../../types/LayerType'
import styles from './_.module.css'

const LAYER_TYPES = {
  gradient: CircleHalf,
  noise: Gradient,
  solid: Palette,
} as const

const EllipseDropdown = ({
  id,
  isActive,
}: {
  id: string
  isActive: boolean
}) => {
  return (
    <div className={styles.ellipse}>
      <IconButton icon={DotsThreeOutlineVertical} size="sm" active={isActive} />
      <div className={styles.dropdown}>
        <IconButton icon={ArrowBendLeftUp} size="sm" />
        <IconButton icon={ArrowBendRightDown} size="sm" />
        <IconButton icon={TrashSimple} size="sm" />
      </div>
    </div>
  )
}

const LayerButton = ({ id, type }: { id: string; type: LayerEnum }) => {
  const Icon = LAYER_TYPES[type]
  const { selectedLayer, setSelectedLayer } = useLayers()
  const isActive = id === selectedLayer
  return (
    <div
      className={`${isActive ? styles.active + ' ' : ''}md`}
      onClick={() => setSelectedLayer(isActive ? '' : id)}
    >
      <Icon size={'1em'} />
      <p>{type}</p>
      <EllipseDropdown id={id} isActive={isActive} />
    </div>
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
