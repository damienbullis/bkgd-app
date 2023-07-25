import { useSearch } from '@tanstack/router'
import { Range } from '@shared'
import { LayerEnum, LayerPropsType } from '../../types/LayerType'

import styles from './_.module.css'
import { useSelectedLayer } from '@state/global'
import { Checkbox, ColorType, Input, Select } from '../_shared/Input'

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

const TEST_LAYER = {
  id: 'test',
  type: 'solid',
  props: {
    color: '#000000',
  },
  opacity: 100,
  backgroundBlend: false,
  blendMode: 'normal',
} satisfies LayerPropsType<'solid'>

const LayerControls = () => {
  const [selectedLayer] = useSelectedLayer()
  const { layerData } = useSearch({ from: '/' })

  const layer =
    layerData.find((layer) => layer.id === selectedLayer) || TEST_LAYER
  const { type } = layer

  return (
    <div className={styles.layerControls}>
      <h5 className="txt-8">Properties</h5>
      {type === 'solid' && <ColorType label="Color" />}
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
      <br />

      <h5 className="txt-8">Adjustments</h5>
      <Range label="Opacity" />
      <Select label="Blend Mode" options={blendModesOptions} />
      <Checkbox label="Background Blend" id="backgroundBlend" />
      <Input label="Background Size" />
      <Input label="Background Position" />
    </div>
  )
}

export default LayerControls
