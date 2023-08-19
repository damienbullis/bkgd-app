import { useMemo } from 'react'
import { Range, Select, Input } from '@shared'

import { LayerType } from '../Layers/LayerTypeSchema'
import styles from './_.module.css'
import { useLayers } from '@state/hooks'
import ColorType from './ColorType'
import BackgroundSize from './BackgroundSize'
import BackgroundPosition from './BackgroundPosition'
import BackgroundRepeat from './BackgroundRepeat'

const blendModesOptions = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  { value: 'color-dodge', label: 'Color Dodge' },
  { value: 'color-burn', label: 'Color Burn' },
  { value: 'hard-light', label: 'Hard Light' },
  { value: 'soft-light', label: 'Soft Light' },
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
]

const FALLBACK = {
  id: 'test',
  type: 'solid',
  props: {
    color: '#000000',
  },
  opacity: 100,
  blendMode: 'normal',
  backgroundPosition: '0% 0%',
  backgroundSize: 'auto',
  backgroundRepeat: 'repeat',
} satisfies LayerType

const LayerControls = () => {
  const { layers, selectedLayer } = useLayers()
  const {
    type,
    props,
    blendMode,
    opacity,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
  } = useMemo(() => {
    return layers.find((l) => l?.id === selectedLayer) || FALLBACK
  }, [layers, selectedLayer])

  return (
    <div className={styles.layerControls}>
      {type === 'gradient' && (
        <div className={styles.inputWrap}>
          <label htmlFor="gradient">Gradient</label>
          <input type="color" id="gradient" onChange={(e) => console.log(e)} />
        </div>
      )}
      {type === 'noise' && (
        <div className={styles.inputWrap}>
          <label htmlFor="noise">Noise</label>
          <input type="color" id="noise" onChange={(e) => console.log(e)} />
        </div>
      )}

      {type === 'solid' && <ColorType label="Color" typeProps={props} />}
      <Range // REFACTOR: Add to ColorType
        label="Opacity"
        id="opacity"
        value={opacity}
      />
      <Select
        label="Blend Mode"
        id="blendMode"
        options={blendModesOptions}
        value={blendMode}
      />
      <BackgroundSize value={backgroundSize} />
      <BackgroundPosition value={backgroundPosition} />
      <BackgroundRepeat value={backgroundRepeat} />
    </div>
  )
}

export default LayerControls
