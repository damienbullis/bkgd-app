import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/router'

import styles from './_.module.css'
import { useSelectedLayer } from '@state/global'
import { debounce, hexToHSL, hexToRGB } from '@utils'
import { LayerPropsType } from '../../../types/LayerType'
import { hslToHex, rgbToHex } from '../../../utils/colorHelpers'
import { useCapabilities } from '../../Capabilities'

type ColorTypeEnum = 'hex' | 'srgb' | 'hsl' | 'display-p3'
type ColorTypeProps = LayerPropsType<'solid'>['props']

/**
 * ColorType Picker Input
 */
export default function ColorType({
  label,
  typeProps,
}: {
  label: string
  typeProps: ColorTypeProps
}) {
  const caps = useCapabilities()
  const hasP3 = caps.displayP3 || false
  const [colorType, setColorType] = useState<ColorTypeEnum>(
    hasP3 ? 'display-p3' : 'hsl'
  )
  const [selectedLayer] = useSelectedLayer()
  const nav = useNavigate({ from: '/' })

  const handler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, colorType: ColorTypeEnum) => {
      // starts as hex
      const _props: ColorTypeProps = {
        color: e.target.value,
      }

      if (colorType === 'srgb' || colorType === 'display-p3') {
        _props.color = hexToRGB(e.target.value)
      }

      if (colorType === 'hsl') {
        _props.color = hexToHSL(e.target.value)
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

      nav({
        search: {
          layerData: [
            {
              id: selectedLayer,
              props: _props,
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

  const debouncedHandler = useMemo(() => debounce(handler, 200), [handler])
  const value = useMemo(() => {
    if (typeof typeProps.color === 'string') return typeProps.color
    if ('h' in typeProps.color) return hslToHex(typeProps.color)
    if ('r' in typeProps.color) return rgbToHex(typeProps.color)
    return '#000000'
  }, [typeProps])
  console.log({ value, caps })
  return (
    <div className={styles.wrap}>
      <label htmlFor={label}>{label}</label>
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
        {hasP3 ? <option value="display-p3">Display P3</option> : null}
      </select>
      <input
        type="color"
        value={value}
        id={label}
        onChange={(e) => debouncedHandler(e, colorType)}
        className="clr"
      />
    </div>
  )
}
