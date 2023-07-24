import { useState } from 'react'
import styles from './_.module.css'
import { hexToHSL, hexToRGB } from '../../../utils/colorHelpers'

type ColorTypeEnum = 'hex' | 'srgb' | 'hsl' | 'display-p3'

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
  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log({ colorType })
    // early return if hex
    if (colorType === 'hex') {
      return e.target.value
    }
    let color = e.target.value
    const el = document.getElementById('colorPreview')
    if (colorType === 'srgb' || colorType === 'display-p3') {
      const rgb = hexToRGB(e.target.value)

      color = `color(${colorType} ${rgb.r} ${rgb.g} ${rgb.b} / 1)`
    }
    if (colorType === 'hsl') {
      const hsl = hexToHSL(e.target.value)

      color = `hsl(${hsl.h} ${hsl.s}% ${hsl.l}% / 1)`
      console.log({ hsl, color })
    }
    if (el) {
      el.style.backgroundColor = color
    }
  }
  return (
    <div className={styles.wrap}>
      <label htmlFor={id || label} className={styles.full}>
        {label}
      </label>
      <input type="color" id={id || label} onChange={handler} />
      <div
        id="colorPreview"
        style={{
          display: 'block',
          width: '100%',
          height: '3rem',
          backgroundColor: `color(${colorType} 0 0 0 / 1)`,
        }}
      ></div>
      <select
        name="colorType"
        id="colorType"
        value={colorType}
        onChange={(e) => setColorType(e.target.value as ColorTypeEnum)}
      >
        <option value="hex">HEX</option>
        <option value="srgb">RGB</option>
        <option value="hsl">HSL</option>
        <option value="display-p3">Display P3</option>
      </select>
    </div>
  )
}
