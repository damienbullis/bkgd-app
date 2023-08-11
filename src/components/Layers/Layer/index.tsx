import { CircleHalf, Gradient, Palette } from '@phosphor-icons/react'
import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'

import { LayerEnum } from '../../../types/LayerType'
import LayerDropdown from './LayerDropdown'
import styles from './_.module.css'

const LAYER_TYPES = {
  gradient: CircleHalf,
  noise: Gradient,
  solid: Palette,
} as const

const LayerButton = ({ id, type }: { id: string; type: LayerEnum }) => {
  const Icon = LAYER_TYPES[type]
  const [selectedLayer] = useSelectedLayer()
  const isActive = id === selectedLayer
  return (
    <div
      className={`${isActive ? styles.active + ' ' : ''}md`}
      onClick={() => EventHandler({ action: 'select-layer', payload: { id } })}
    >
      <Icon size={'1em'} />
      <p>{type}</p>
      <LayerDropdown id={id} isActive={isActive} />
    </div>
  )
}

export default LayerButton
