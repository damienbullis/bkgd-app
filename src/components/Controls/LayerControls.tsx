import { useSearch } from '@tanstack/router'
import { Range } from '@shared'
import { LayerEnum, LayerPropsType } from '../../types/LayerType'

import styles from './_.module.css'
import { useSelectedLayer } from '@state/global'

const PlaceholderInput = () => (
  <input type="text" placeholder="Coming Soon" disabled />
)

const LayerTypeProperties = <T extends LayerEnum>({ type }: { type: T }) => {
  return (
    <div className={styles._section}>
      <h5 className="txt-8">Properties</h5>
      {type === 'solid' && (
        <div className={styles.inputWrap}>
          <label htmlFor="color">Color</label>
          <input type="color" id="color" onChange={(e) => console.log(e)} />
        </div>
      )}
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
    </div>
  )
}

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
      <div className={styles._section}>
        <LayerTypeProperties type={type} />
      </div>
      <div className={styles._section}>
        <h5 className="txt-8">Adjustments</h5>
        <Range label="Opacity" />

        <div className={styles.inputWrap}>
          <label htmlFor="blendMode" className={styles.full}>
            Blend Mode
          </label>
          <select id="blendMode">
            <option value="normal">Normal</option>
            <option value="multiply">Multiply</option>
            <option value="screen">Screen</option>
            <option value="overlay">Overlay</option>
            <option value="darken">Darken</option>
            <option value="lighten">Lighten</option>
            <option value="color-dodge">Color Dodge</option>
            <option value="color-burn">Color Burn</option>
            <option value="hard-light">Hard Light</option>
            <option value="soft-light">Soft Light</option>
            <option value="difference">Difference</option>
            <option value="exclusion">Exclusion</option>
            <option value="hue">Hue</option>
            <option value="saturation">Saturation</option>
            <option value="color">Color</option>
            <option value="luminosity">Luminosity</option>
          </select>
        </div>
        <div className={styles.inputWrap}>
          <label htmlFor="backgroundBlend">Background Blend</label>
          <input
            type="checkbox"
            id="backgroundBlend"
            onChange={(e) => console.log(e)}
          />
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="backgroundSize">Background Size</label>
          <PlaceholderInput />
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="backgroundPosition">Background Position</label>
          <PlaceholderInput />
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="backgroundOrigin">Background Origin</label>
          <PlaceholderInput />
        </div>
      </div>
    </div>
  )
}

export default LayerControls
