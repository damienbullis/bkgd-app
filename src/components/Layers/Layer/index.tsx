import {
  CircleHalf,
  ClockCountdown,
  Palette,
  Record,
  Waveform,
} from '@phosphor-icons/react'
import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'

import LayerDropdown from './LayerDropdown'
import styles from './_.module.css'
import { useSearch } from '@tanstack/router'

const LAYER_TYPES = {
  linear: CircleHalf,
  radial: Record,
  conic: ClockCountdown,
  noise: Waveform,
  solid: Palette,
} as const

const LayerButton = ({
  id,
  type,
}: {
  id: string
  type: keyof typeof LAYER_TYPES
}) => {
  const Icon = LAYER_TYPES[type]
  const [selectedLayer] = useSelectedLayer()
  const { layerStack = [] } = useSearch({ from: '/' })
  const isActive = id === selectedLayer
  return (
    <div
      className={`${styles.layer} ${isActive ? styles.active : ''} md`}
      onClick={() => EventHandler({ action: 'select-layer', payload: { id } })}
    >
      <Icon size={'1em'} />
      <p>{type}</p>
      <LayerDropdown id={id} isActive={isActive} stack={layerStack} />
    </div>
  )
}

export default LayerButton
