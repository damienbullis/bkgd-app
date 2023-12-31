import { useEffect, useRef } from 'react'

import {
  MinusSquare,
  PlusSquare,
  SelectionInverse,
  X,
} from '@phosphor-icons/react'
import { EventHandler } from '@state/events'
import { debounce, hslToHex, rgbToHex } from '@utils'
import { Popover } from '@headlessui/react'
import { ColorInput, HoverText } from '@shared'
import { GradientStopsType } from '.'

const deHandler = debounce(EventHandler, 200)

const getID = (index: number) => `gradient-stop-${index}-` as const

const transformColorValue = (color: GradientStopsType[0]) => {
  if (typeof color === 'string') {
    return color
  } else {
    if ('r' in color) {
      return rgbToHex(color)
    } else {
      return hslToHex(color)
    }
  }
}

const GradientStop = ({
  index,
  color,
  opacity,
  stop,
  allStops,
  selectedLayer,
  type,
}: {
  index: number
  color: GradientStopsType[0]
  opacity: GradientStopsType[1]
  stop: GradientStopsType[2]
  allStops: GradientStopsType[]
  selectedLayer: string
  type: 'linear' | 'radial' | 'conic'
}) => {
  const prevSelectedLayer = useRef(selectedLayer)
  const isArr = Array.isArray(stop)
  const _pos = Math.floor((100 / allStops.length) * (index + 1))
  const _id = getID(index)

  useEffect(() => {
    if (prevSelectedLayer.current !== selectedLayer) {
      prevSelectedLayer.current = selectedLayer
      const _color = document.querySelector<HTMLInputElement>(`#${_id}color`)
      const _opacity = document.querySelector<HTMLInputElement>(
        `#${_id}opacity`
      )

      if (_color) _color.value = transformColorValue(color)
      if (_opacity) _opacity.value = String(opacity ?? 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])
  return (
    <div className="flex w-full flex-row flex-nowrap items-center justify-between gap-4 p-2 py-1">
      <div className="flex w-auto items-center justify-start gap-4">
        <h5>{index + 1}</h5>

        <ColorInput
          id={_id + 'color'}
          defaultValue={transformColorValue(color)}
          onChange={(e) => {
            allStops[index][0] = e.target.value
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type,
                  stops: allStops,
                },
              },
            })
          }}
        />

        {/* Opacity */}
        <div className="flex min-w-[4rem] cursor-pointer flex-row items-stretch justify-start gap-2">
          <Popover className="relative">
            <Popover.Button>
              <span className="group relative inline-flex h-full items-center gap-2">
                <SelectionInverse weight="fill" />
                {opacity ?? 100}%<HoverText>Opacity</HoverText>
              </span>
            </Popover.Button>
            <Popover.Panel className="absolute z-10 rounded-md bg-[#00000099] px-4 py-2 shadow-2xl shadow-black backdrop-brightness-50">
              <input
                id={_id + 'opacity'}
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
                  allStops[index][1] = Number(e.target.value)
                  deHandler({
                    action: 'bkgd-update-layer',
                    payload: {
                      id: selectedLayer,
                      type: 'gradient',
                      props: {
                        type,
                        stops: allStops,
                      },
                    },
                  })
                }}
              />
            </Popover.Panel>
          </Popover>
        </div>
      </div>

      {/* Position */}
      <div className="ml-auto flex cursor-pointer flex-row items-center justify-start gap-2">
        <span className="inline-flex flex-row items-center gap-2">
          <Popover className="relative">
            <Popover.Button>
              <span className="group relative">
                {isArr ? stop[0] : stop ?? _pos}%<HoverText>Position</HoverText>
              </span>
            </Popover.Button>
            <Popover.Panel className="absolute left-0 top-full z-10 rounded-md bg-[#00000099] px-4 py-2 shadow-2xl shadow-black backdrop-brightness-50">
              <input
                id={_id + 'stop-1'}
                type="range"
                defaultValue={isArr ? stop[0] : stop ?? _pos}
                min={-100}
                max={200}
                step={5}
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
                  allStops[index][2] = isArr
                    ? [Number(e.target.value), stop[1]]
                    : Number(e.target.value)
                  deHandler({
                    action: 'bkgd-update-layer',
                    payload: {
                      id: selectedLayer,
                      type: 'gradient',
                      props: {
                        type,
                        stops: allStops,
                      },
                    },
                  })
                }}
              />
            </Popover.Panel>
          </Popover>
          {isArr ? (
            <Popover className="relative">
              <Popover.Button className="ml-2">
                {isArr ? stop[1] : stop ?? _pos}%
              </Popover.Button>
              <Popover.Panel className="absolute z-10 rounded-md bg-[#00000099] px-4 py-2 shadow-2xl shadow-black backdrop-brightness-50">
                <input
                  id={_id + 'stop-2'}
                  type="range"
                  defaultValue={isArr ? stop[0] : stop ?? _pos}
                  min={-100}
                  max={200}
                  step={5}
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
                    allStops[index][2] = [stop[0], Number(e.target.value)]
                    deHandler({
                      action: 'bkgd-update-layer',
                      payload: {
                        id: selectedLayer,
                        type: 'gradient',
                        props: {
                          type,
                          stops: allStops,
                        },
                      },
                    })
                  }}
                />
              </Popover.Panel>
            </Popover>
          ) : null}

          {isArr ? (
            <button
              className="text-xl"
              onClick={() => {
                allStops[index][2] = _pos

                deHandler({
                  action: 'bkgd-update-layer',
                  payload: {
                    id: selectedLayer,
                    type: 'gradient',
                    props: {
                      type,
                      stops: allStops,
                    },
                  },
                })
              }}
            >
              <MinusSquare />
            </button>
          ) : (
            <button
              className="text-xl"
              onClick={() => {
                allStops[index][2] = [_pos, _pos]
                deHandler({
                  action: 'bkgd-update-layer',
                  payload: {
                    id: selectedLayer,
                    type: 'gradient',
                    props: {
                      type,
                      stops: allStops,
                    },
                  },
                })
              }}
            >
              <PlusSquare />
            </button>
          )}
        </span>
      </div>

      <button
        className="text-sm text-gray-300 transition-transform 
        hover:text-white focus:scale-95 focus:text-white
        active:scale-95 active:text-white"
        onClick={() => {
          deHandler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              type: 'gradient',
              props: {
                type,
                stops: allStops.filter((_, i) => i !== index),
              },
            },
          })
        }}
      >
        <X size={'1.5em'} />
      </button>
    </div>
  )
}

export default GradientStop
