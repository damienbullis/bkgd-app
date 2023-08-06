import { useMemo } from 'react'
import { Sliders } from '@phosphor-icons/react'
import { useSearch } from '@tanstack/router'

import { Range, Checkbox, ColorType, Select, Input } from '@shared'
import { useSelectedLayer } from '@state/global'

import { LayerType } from '../Layers/LayerTypeSchema'
import styles from './_.module.css'

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
  backgroundBlend: false,
  blendMode: 'normal',
  backgroundPosition: '0% 0%',
  backgroundSize: 'auto',
  backgroundRepeat: true,
} satisfies LayerType

const SectionTitle = ({
  children,
  alignment = 'start',
}: {
  children: string
  alignment?: 'start' | 'end'
}) => (
  <div
    className={`${styles.title} ${alignment === 'end' ? styles.reverse : ''}`}
  >
    <label className="txt-8">{children}</label>
    <Sliders size={'1.5em'} />
  </div>
)

const LayerControls = () => {
  const [selectedLayer] = useSelectedLayer()
  const { layerData } = useSearch({ from: '/' })

  const { type, opacity, blendMode, backgroundBlend, props } =
    useMemo<LayerType>(() => {
      return layerData.find((layer) => layer.id === selectedLayer) || FALLBACK
    }, [layerData, selectedLayer])

  return (
    <div className={styles.layerControls}>
      <SectionTitle>Properties</SectionTitle>
      {type === 'solid' && <ColorType label="Color" typeProps={props} />}
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

      <h5 className="txt-8">Adjustments</h5>
      <Range label="Opacity" value={opacity} />
      <Select
        label="Blend Mode"
        options={blendModesOptions}
        value={blendMode}
      />
      <Checkbox label="Background Blend" value={backgroundBlend} />
      <Input label="Size" />
      <Input label="Position" />
      <Input label="Repeat" />
    </div>
  )
}

export default LayerControls
