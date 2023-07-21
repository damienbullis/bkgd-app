import { useSearch } from '@tanstack/router'
import { Range } from '@shared'
import { LayerEnum, LayerPropsType } from '../../types/LayerType'

import styles from './_.module.css'
import { useSelectedLayer } from '@state/global'

const LayerProperties = <T extends LayerEnum>({
  type,
  props,
}: Pick<LayerPropsType<T>, 'type' | 'props'>) => {
  console.log('LayerProperties', { type, props })
  return (
    <div className={styles._section}>
      <h5 className="txt-8">Properties</h5>
      <div className={styles.inputWrap}>
        <label htmlFor="color">Color</label>
        <input type="color" id="color" onChange={(e) => console.log(e)} />
      </div>
    </div>
  )
}
const LayerAdjustments = <T extends LayerEnum>({
  opacity,
  blendMode,
  backgroundBlend,
}: Pick<LayerPropsType<T>, 'opacity' | 'blendMode' | 'backgroundBlend'>) => {
  console.log('LayerAdjustments', { opacity, blendMode, backgroundBlend })

  /**
   * TODO: Add some additional controls
   *
   * - Background Size
   * - Background Position
   * - Background Origin
   * - Background Attachment**
   * - Background Repeat**
   * - Background Clip**
   */

  return (
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
  console.log({ layer, type })

  return (
    <div className={styles.layerControls}>
      <LayerProperties type={layer.type} props={layer.props} />
      <LayerAdjustments
        opacity={layer.opacity}
        backgroundBlend={layer.backgroundBlend}
        blendMode={layer.blendMode}
      />
    </div>
  )
}

export default LayerControls
