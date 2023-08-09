import React, { useState } from 'react'
import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'
import { debounce, hexToHSL, hexToRGB, hslToHex, rgbToHex } from '@utils'

import { LayerPropsType } from '../../../types/LayerType'
import { useCapabilities } from '../../Capabilities'
import styles from './_.module.css'

type ColorTypeEnum = 'hex' | 'srgb' | 'hsl' | 'display-p3'
type ColorTypeProps = LayerPropsType<'solid'>['props']

const deb = debounce(EventHandler, 200)

const DEFAULT_COLOR = '#000000'
const getValue = (val: ColorTypeProps['color'], hasP3: boolean) => {
  if (typeof val === 'string') {
    if (val.startsWith('#')) return val
    return DEFAULT_COLOR
  }
  if ('h' in val) return hslToHex(val)
  if ('r' in val) return rgbToHex(val, hasP3)
  return DEFAULT_COLOR
}

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
  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // starts as hex
    const _props: ColorTypeProps = {
      color: e.target.value,
    }

    if (colorType === 'display-p3' || colorType === 'srgb') {
      _props.color = hexToRGB(e.target.value, hasP3)
    }

    if (colorType === 'hsl') {
      _props.color = hexToHSL(e.target.value)
    }

    deb({
      action: 'bkgd-update-layer',
      payload: {
        id: selectedLayer,
        props: _props,
      },
    })
  }

  const value = getValue(typeProps.color, hasP3)

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
          <option value="srgb">SRGB</option>
        )}
      </select>
      <input
        type="color"
        value={value}
        id={label}
        onChange={handler}
        className="clr"
      />
    </div>
  )
}
