import { useEffect, useRef } from 'react'
import { GradientStopsType, getID, transformColorValue } from './_helpers'
import {
  MinusSquare,
  PaintBucket,
  PlusSquare,
  Trash,
  TrashSimple,
} from '@phosphor-icons/react'
import { EventHandler } from '@state/events'
import { debounce } from '@utils'
import { Popover } from '@headlessui/react'
import { HoverText } from '@shared'

const deHandler = debounce(EventHandler, 200)

const GradientStop = ({
  index,
  color,
  opacity,
  stop,
  allStops,
  selectedLayer,
}: {
  index: number
  color: GradientStopsType[0]
  opacity: GradientStopsType[1]
  stop: GradientStopsType[2]
  allStops: GradientStopsType[]
  selectedLayer: string
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
      <div className="flex w-auto items-center justify-start gap-2">
        <h5>{index + 1}</h5>
        <div className="relative flex cursor-pointer">
          <div className="bottom pointer-events-none absolute inset-0 z-[1] flex place-content-center place-items-center">
            <PaintBucket className="pointer-events-none text-xl" />
          </div>
          <input
            id={getID(index) + 'color'}
            className="h-8 w-8 cursor-pointer appearance-none overflow-hidden rounded-full
            [&::-webkit-color-swatch-wrapper]:border-0
            [&::-webkit-color-swatch-wrapper]:p-0
            [&::-webkit-color-swatch]:border-0
            [&::-webkit-color-swatch]:outline-0"
            type="color"
            defaultValue={transformColorValue(color)}
            onChange={(e) => {
              allStops[index][0] = e.target.value
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'linear',
                    stops: allStops,
                  },
                },
              })
            }}
          />
        </div>
      </div>

      {/* Position */}
      <div className="ml-auto flex cursor-pointer flex-row items-center justify-start gap-2">
        <span className="inline-flex flex-row items-center gap-2">
          <Popover className="relative">
            <Popover.Button className="ml-2">
              <span className="group relative">
                {isArr ? stop[0] : stop ?? _pos}%<HoverText>Position</HoverText>
              </span>
            </Popover.Button>
            <Popover.Panel className="absolute z-10 rounded-md bg-[#00000099] px-4 py-2 shadow-2xl shadow-black backdrop-brightness-50">
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
                onChange={(e) =>
                  deHandler({
                    action: 'bkgd-update-layer',
                    payload: {
                      id: selectedLayer,
                      type: 'gradient',
                      props: {
                        type: 'linear',
                        stops: allStops.map((s, i) =>
                          i === index
                            ? [
                                s[0],
                                s[1],
                                isArr
                                  ? [Number(e.target.value), stop[1]]
                                  : Number(e.target.value),
                              ]
                            : s
                        ),
                      },
                    },
                  })
                }
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
                          type: 'linear',
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
                      type: 'linear',
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
                      type: 'linear',
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

      {/* Opacity */}
      <div className="flex min-w-[4rem] cursor-pointer flex-row items-center justify-end gap-2">
        <span className="inline-flex flex-row items-center gap-2">
          <Popover className="relative">
            <Popover.Button className="ml-2">
              <span className="group relative">
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
                onChange={(e) =>
                  deHandler({
                    action: 'bkgd-update-layer',
                    payload: {
                      id: selectedLayer,
                      type: 'gradient',
                      props: {
                        type: 'linear',
                        stops: allStops.map((s, i) =>
                          i === index ? [s[0], Number(e.target.value), s[2]] : s
                        ),
                      },
                    },
                  })
                }
              />
            </Popover.Panel>
          </Popover>
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
                type: 'linear',
                stops: allStops.filter((_, i) => i !== index),
              },
            },
          })
        }}
      >
        <Trash size={'1.5em'} />
      </button>
    </div>
  )
}

export default GradientStop
