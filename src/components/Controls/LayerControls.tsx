import styles from './_.module.css'

const LayerProperties = () => {
  return (
    <div className={styles._section}>
      <h5 className="txt-8">Properties</h5>
      <div className={styles.inputWrap}>
        <label htmlFor="color">Color</label>
        <input type="color" id="color" onChange={(e) => console.log(e)} />
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="optimize">Optimize</label>
        <input type="checkbox" id="optimize" />
      </div>
    </div>
  )
}
const LayerAdjustments = () => {
  return (
    <div className={styles._section}>
      <h5 className="txt-8">Adjustments</h5>
      <div className={styles.inputWrap}>
        <label htmlFor="opacity" className={styles.full}>
          Opacity
        </label>
        <input type="range" id="opacity" defaultValue="100" min="0" max="100" />
      </div>
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
// TODO: Define Layer Type

const LayerControls = () => {
  return (
    <div className={styles.layerControls}>
      <LayerProperties />
      <LayerAdjustments />
    </div>
  )
}

export default LayerControls
