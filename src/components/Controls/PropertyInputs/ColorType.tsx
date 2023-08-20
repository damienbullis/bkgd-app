import React, { useEffect, useState } from 'react'
import { debounce, hexToHSL, hexToRGB, hslToHex, rgbToHex } from '@utils'
import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'
import { LayerPropsType } from '@types'
import { Select } from '@shared'

import { useCapabilities } from '../../Capabilities'
import styles from './ColorType.module.css'

//#region types & utils

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

const getColor = (
  e: React.ChangeEvent<HTMLInputElement>,
  colorType: ColorTypeEnum,
  hasP3: boolean
) => {
  if (colorType === 'display-p3' || colorType === 'srgb') {
    return hexToRGB(e.target.value, hasP3)
  }

  if (colorType === 'hsl') {
    return hexToHSL(e.target.value)
  }
  // hex
  console.log('hex', { v: e.target.value, hasP3, colorType })
  return e.target.value
}

//#endregion

const label = 'Color'

/**
 * ColorType Picker Input
 */
export default function ColorType({
  typeProps,
}: {
  typeProps: ColorTypeProps
}) {
  const [selectedLayer] = useSelectedLayer()
  const caps = useCapabilities()
  const hasP3 = (caps.displayP3 as boolean) || false
  const [colorType, setColorType] = useState<ColorTypeEnum>('hex')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const value = getValue(typeProps.color, hasP3)

  useEffect(() => {
    // because this in an uncontrolled input
    // when selectedLayer changes, we need to update the value manually
    if (inputRef.current) {
      inputRef.current.value = value
    }
  }, [value])
  // REFACTOR: ADD OPACITY SLIDER HERE
  return (
    <div className={styles.wrap}>
      <label htmlFor={label}>{label}</label>
      <Select
        label="color type"
        hideLabel
        options={[
          { value: 'hex', label: 'HEX' },
          { value: 'hsl', label: 'HSL' },
          ...(hasP3
            ? [{ value: 'display-p3', label: 'Display P3' }]
            : [{ value: 'srgb', label: 'SRGB' }]),
        ]}
        value={colorType}
        onChange={(e) => setColorType(e.target.value as ColorTypeEnum)}
      />
      <input
        ref={inputRef}
        type="color"
        defaultValue={value}
        id={label}
        onChange={(e) => {
          // starts as hex
          deb({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              props: {
                color: getColor(e, colorType, hasP3),
              },
            },
          })
        }}
        className="clr"
      />
    </div>
  )
}