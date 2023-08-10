import { CircleHalf, Gradient, Palette } from '@phosphor-icons/react'
import { LayerEnum } from '../../../types/LayerType'
import { useLayers } from '@state/hooks'
import styles from './_.module.css'
import LayerDropdown from './LayerDropdown'

const LAYER_TYPES = {
  gradient: CircleHalf,
  noise: Gradient,
  solid: Palette,
} as const

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
      <LayerDropdown id={id} isActive={isActive} />
    </div>
  )
}

export default LayerButton
