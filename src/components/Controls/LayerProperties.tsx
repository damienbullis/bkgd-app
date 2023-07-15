import styles from './_.module.css'

const LayerProperties = () => {
  return (
    <div className={styles.properties}>
      <div className={styles._section}>
        <h5 className="txt-7">Properties</h5>
        <div className={styles._row}>
          <label htmlFor="solid_color">Solid Color</label>
          <input type="color" id="solid_color" />
        </div>
      </div>
      <div className={styles._section}>
        <h5 className="txt-7">Blending</h5>
        <div className={styles._row}>
          <label htmlFor="opacity">Opacity</label>
          <input type="range" id="opacity" defaultValue="1" min="0" max="1" />
        </div>
        <div className={styles._row}>
          <label htmlFor="blend_mode">Blend Mode</label>
          <select id="blend_mode">
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
    </div>
  )
}

export default LayerProperties
