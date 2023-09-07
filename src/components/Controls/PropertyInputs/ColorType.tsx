import React, { useEffect, useState } from 'react'
import { debounce, hexToHSL, hexToRGB, hslToHex, rgbToHex } from '@utils'
import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'
import { HoverText, Range, Select } from '@shared'

import { useCapabilities } from '../../Capabilities'
import styles from './ColorType.module.css'
import { SolidLayerType } from '../../Layers/LayerTypeSchema'
import { Popover } from '@headlessui/react'
import { CircleDashed } from '@phosphor-icons/react'

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
      <div className="mb-4 flex flex-row items-center justify-start gap-4">
        <h4 className="-skew-x-6" style={{ color: value }}>
          SOLID COLOR
        </h4>

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
          className="m-0 ml-auto h-8 w-8 cursor-pointer appearance-none overflow-hidden rounded-full border-none bg-transparent p-0 outline-none ring-0 transition
            focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-black
            hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-black
            focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
            active:ring-1 active:ring-white active:ring-offset-2 active:ring-offset-black
            [&::-webkit-color-swatch-wrapper]:border-none
            [&::-webkit-color-swatch-wrapper]:p-0
            [&::-webkit-color-swatch-wrapper]:outline-none
            [&::-webkit-color-swatch]:border-none
            [&::-webkit-color-swatch]:outline-none"
        />

        {/* Color Type
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
          onChange={(v) => {
            setColorType(v as ColorTypeEnum)
            console.log(inputRef.current?.value)
            deb({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                props: {
                  color: getColor(
                    {
                      target: { value: inputRef.current?.value ?? '' },
                    } as React.ChangeEvent<HTMLInputElement>,
                    v as ColorTypeEnum,
                    hasP3
                  ),
                },
              },
            })
          }}
        />
        */}

        {/* Opacity */}
        <div className="mt-1 flex flex-row items-center justify-end gap-2">
          <Popover className="relative">
            <Popover.Button>
              <span className="group relative inline-flex cursor-pointer items-center gap-2">
                <CircleDashed />
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
      </div>
    </>
  )
}
