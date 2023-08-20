import { useMemo } from 'react'
import { Range, Select } from '@shared'
import { useLayers } from '@state/hooks'

import { LayerType } from '../Layers/LayerTypeSchema'
import BackgroundPosition from './PropertyInputs/BackgroundPosition'
import BackgroundSize from './PropertyInputs/BackgroundSize'
import ColorType from './PropertyInputs/ColorType'

import styles from './_.module.css'
import NoiseType from './PropertyInputs/NoiseType'

const blendModesOptions = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
]

const repeatOptions = [
  'repeat',
  'repeat-x',
  'repeat-y',
  'no-repeat',
  'space',
  'round',
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
      {type === 'noise' && <NoiseType typeProps={props} />}

      {type === 'solid' && <ColorType typeProps={props} />}
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
      <Select
        label="Background Repeat"
        id="backgroundRepeat"
        options={repeatOptions}
        value={backgroundRepeat}
      />
    </div>
  )
}

export default LayerControls
