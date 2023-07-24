import { useState } from 'react'
import styles from './_.module.css'

type ColorTypeEnum = 'hex' | 'rgb' | 'hsl' | 'display-p3'

/**
 * ColorType Picker Input
 */
export default function ColorType({
  label,
  id,
}: {
  label: string
  id?: string
}) {
  const [colorType, setColorType] = useState<ColorTypeEnum>('display-p3')
  return (
    <div className={styles.wrap}>
      <label htmlFor={id || label} className={styles.full}>
        {label}
      </label>
      <input type="color" id={id || label} onChange={(e) => console.log(e)} />

      <select
        name="colorType"
        id="colorType"
        value={colorType}
        onChange={(e) => setColorType(e.target.value as ColorTypeEnum)}
      >
        <option value="hex">HEX</option>
        <option value="rgb">RGB</option>
        <option value="hsl">HSL</option>
        <option value="display-p3">Display P3</option>
      </select>
    </div>
  )
}
