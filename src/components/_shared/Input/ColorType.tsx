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
  const hasP3 = (caps.displayP3 as boolean) || false
  const [colorType, setColorType] = useState<ColorTypeEnum>(
    hasP3 ? 'display-p3' : 'srgb'
  )
  const [selectedLayer] = useSelectedLayer()
  const nav = useNavigate({ from: '/' })

  const handler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, colorType: ColorTypeEnum) => {
      // starts as hex
      console.log({ e, colorType })
      const _props: ColorTypeProps = {
        color: e.target.value,
      }

      if (colorType === 'display-p3' || colorType === 'srgb') {
        _props.color = hexToRGB(e.target.value, hasP3)
      }

      if (colorType === 'hsl') {
        _props.color = hexToHSL(e.target.value)
      }

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
    [nav, selectedLayer, hasP3]
  )

  const debouncedHandler = useMemo(() => debounce(handler, 200), [handler])
  const value = useMemo(() => {
    if (typeof typeProps.color === 'string') return typeProps.color
    if ('h' in typeProps.color) return hslToHex(typeProps.color)
    if ('r' in typeProps.color) return rgbToHex(typeProps.color, hasP3)
    return 'pink'
  }, [typeProps, hasP3])
  console.log({ typeProps, value, caps })

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
        <option value="hsl">HSL</option>
        {hasP3 ? (
          <option value="display-p3">Display P3</option>
        ) : (
          <option value="srgb">RGB</option>
        )}
      </select>
      <input
        type="color"
        defaultValue={value}
        id={label}
        onChange={(e) => debouncedHandler(e, colorType)}
        className="clr"
      />
    </div>
  )
}
