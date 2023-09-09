import { debounce } from '@utils'
import { useEffect, useState } from 'react'
import { EventHandler } from '@state/events'
import { Popover } from '@headlessui/react'
import { HoverText } from '@shared'

const deHandler = debounce(EventHandler, 200)

export default function RadialPosition({
  position,
  selectedLayer,
}: {
  position?: [number, number]
  selectedLayer: string
}) {
  const [[x, y], setXY] = useState<[number, number]>(position || [50, 50])
  useEffect(() => {
    setXY(position || [50, 50])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])

  return (
    <>
      {/* Position */}
      <div className="flex cursor-pointer flex-row items-center justify-start">
        <span className="inline-flex flex-row items-center gap-2">
          <Popover className="relative">
            <span className="group relative">
              <Popover.Button>
                {x}%<HoverText>Position X</HoverText>
              </Popover.Button>
            </span>
            <Popover.Panel className="absolute z-10 rounded-md bg-[#00000099] px-4 py-2 shadow-2xl shadow-black backdrop-brightness-50">
              <input
                id={'radial-position-x'}
                type="range"
                value={x}
                min={0}
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
                  setXY([Number(e.target.value), y])
                  deHandler({
                    action: 'bkgd-update-layer',
                    payload: {
                      id: selectedLayer,
                      type: 'gradient',
                      props: {
                        type: 'radial',
                        position: [Number(e.target.value), y],
                      },
                    },
                  })
                }}
              />
            </Popover.Panel>
          </Popover>

          <Popover className="relative">
            <span className="group relative">
              <Popover.Button>
                {y}%<HoverText>Position Y</HoverText>
              </Popover.Button>
            </span>

            <Popover.Panel className="absolute z-10 rounded-md bg-[#00000099] px-4 py-2 shadow-2xl shadow-black backdrop-brightness-50">
              <input
                id={'radial-position-y'}
                type="range"
                value={y}
                min={0}
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
                  setXY([x, Number(e.target.value)])
                  deHandler({
                    action: 'bkgd-update-layer',
                    payload: {
                      id: selectedLayer,
                      type: 'gradient',
                      props: {
                        type: 'radial',
                        position: [x, Number(e.target.value)],
                      },
                    },
                  })
                }}
              />
            </Popover.Panel>
          </Popover>
        </span>
      </div>
    </>
  )
}
