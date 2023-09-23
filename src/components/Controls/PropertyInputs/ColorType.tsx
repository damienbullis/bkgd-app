import React, {
  useEffect,
  // useState
} from 'react'
import { debounce, hexToHSL, hexToRGB, hslToHex, rgbToHex } from '@utils'
import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'
import { ColorInput, HoverText } from '@shared'

import { useCapabilities } from '../../Capabilities'
import { SolidLayerType } from '@types'
import { Popover } from '@headlessui/react'
import { SelectionInverse } from '@phosphor-icons/react'

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

  // const [colorType, setColorType] = useState<ColorTypeEnum>('hex')
  const colorType = 'hex'
  const value = getValue(typeProps.color, hasP3)

  useEffect(() => {
    // because this in an uncontrolled input
    // when selectedLayer changes, we need to update the value manually
    const el = document.querySelector<HTMLInputElement>(`${label}-color`)
    if (el) {
      el.value = value
    }
  }, [value])

  return (
    <>
      {/* Header */}
      <div className="mb-4 flex flex-row items-center justify-start gap-4">
        <h4 className="-skew-x-6">SOLID COLOR</h4>

        <ColorInput
          defaultValue={value}
          id={label + '-color'}
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
        />

        {/* Color Type DO I NEED THIS?
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
                <SelectionInverse weight="fill" />
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
