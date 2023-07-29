import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/router'

import styles from './_.module.css'
import { useSelectedLayer } from '@state/global'
import { debounce, hexToHSL, hexToRGB } from '@utils'

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
  const [selectedLayer] = useSelectedLayer()
  const nav = useNavigate({ from: '/' })

  const handler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, colorType: ColorTypeEnum) => {
      // starts as hex
      let color = e.target.value

      if (colorType === 'srgb' || colorType === 'display-p3') {
        const rgb = hexToRGB(e.target.value)
        color = `color(${colorType} ${rgb.r} ${rgb.g} ${rgb.b} / 1)`
      }

      if (colorType === 'hsl') {
        const hsl = hexToHSL(e.target.value)
        color = `hsl(${hsl.h} ${hsl.s}% ${hsl.l}% / 1)`
      }

      /**
       *  NEXT: Should also create hook / context / provider for:
       *
       * 1. Hooking into the selected layer
       * 2. Hooking to layerData[selectedLayer]
       * 3. Hooking into the specific key of layerData[selectedLayer]
       * 4. Providing a setter for that key
       */

      // NEXT: This should get turned into a function
      // that is like a middleware for the nav fn (state)
      // on a state change we:
      // 1. Check the action type
      //    - possibly check action payload as well
      // 2. Update the title element
      // 3. Update the URL
      const headEl = document.head
      const titleEl = headEl.querySelector('title')
      if (titleEl) titleEl.textContent = `Color: ${color}`

      nav({
        search: {
          layerData: [
            {
              id: selectedLayer,
              props: {
                color: color,
              },
              type: 'solid',
              // opacity: 100,
              // backgroundBlend: false,
              // blendMode: 'normal',
            },
          ],
        },
      })
    },
    [nav, selectedLayer]
  )
  // const throttled = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>, colorType: ColorTypeEnum) => {
  //     return throttle(handler, 200)
  //   },
  //   [handler]
  // )
  const throttled = useMemo(() => debounce(handler, 200), [handler])
  return (
    <div className={styles.wrap}>
      <label htmlFor={id || label}>{label}</label>
      <select
        name="colorType"
        id="colorType"
        value={colorType}
        className="clr"
        onChange={(e) => setColorType(e.target.value as ColorTypeEnum)}
      >
        <option value="hex">HEX</option>
        <option value="srgb">RGB</option>
        <option value="hsl">HSL</option>
        <option value="display-p3">Display P3</option>
      </select>
      <input
        type="color"
        id={id || label}
        onChange={(e) => throttled(e, colorType)}
        className="clr"
      />
    </div>
  )
}
