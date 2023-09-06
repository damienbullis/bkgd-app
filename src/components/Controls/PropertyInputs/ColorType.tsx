import React, { useEffect, useState } from 'react'
import { debounce, hexToHSL, hexToRGB, hslToHex, rgbToHex } from '@utils'
import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'
import { HoverText, Range, Select } from '@shared'

import { useCapabilities } from '../../Capabilities'
import styles from './ColorType.module.css'
import { SolidLayerType } from '../../Layers/LayerTypeSchema'
import { Popover } from '@headlessui/react'

//#region types & utils

type ColorTypeEnum = 'hex' | 'srgb' | 'hsl' | 'display-p3'
type ColorTypeProps = SolidLayerType['props']

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
  return e.target.value
}

//#endregion

const label = 'Color'

/**
 * ColorType Picker Input
 */
export default function ColorType({
  typeProps,
  opacity,
}: {
  typeProps: ColorTypeProps
  opacity?: number
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

  return (
    <>
      {/* Header */}
      <div className="mb-4 flex flex-row items-center justify-start gap-2">
        <h4 className="-skew-x-6 text-white">SOLID COLOR</h4>

        {/* Opacity */}
        <div className="ml-auto mr-4 flex min-w-[4rem] flex-row items-center justify-end gap-2">
          <Popover className="relative">
            <Popover.Button>
              <span className="group relative">
                {opacity ?? 100}%<HoverText>Opacity</HoverText>
              </span>
            </Popover.Button>
            <Popover.Panel className="absolute z-10 rounded-md bg-[#00000099] px-4 py-2 shadow-2xl shadow-black backdrop-brightness-50">
              <input
                id="opacity"
                type="range"
                defaultValue={opacity ?? 100}
                min={0}
                max={100}
                className="
                  appearance:none m-0 w-32 cursor-pointer rounded-full transition-all 
                  [&::-webkit-slider-container]:h-2
                  [&::-webkit-slider-container]:appearance-none
                  [&::-webkit-slider-container]:rounded-full 
                  [&::-webkit-slider-container]:bg-gray-500
                  [&::-webkit-slider-container]:transition-colors
                  hover:[&::-webkit-slider-container]:bg-gray-400
                  active:[&::-webkit-slider-container]:bg-gray-50"
                onChange={(e) => {
                  deb({
                    action: 'bkgd-update-layer',
                    payload: {
                      id: selectedLayer,
                      type: 'solid',
                      opacity: Number(e.target.value),
                    },
                  })
                }}
              />
            </Popover.Panel>
          </Popover>
        </div>

        <label className="text-sm text-gray-300">{label}</label>
        <Select
          id=""
          options={[
            { value: 'hex', label: 'HEX' },
            { value: 'hsl', label: 'HSL' },
            ...(hasP3
              ? [{ value: 'display-p3', label: 'Display P3' }]
              : [{ value: 'srgb', label: 'SRGB' }]),
          ]}
          value={colorType}
          onChange={(v) => setColorType(v as ColorTypeEnum)}
        />
      </div>

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
        className="h-20 w-full appearance-none border-none bg-transparent outline-none ring-0"
      />
    </>
  )
}
