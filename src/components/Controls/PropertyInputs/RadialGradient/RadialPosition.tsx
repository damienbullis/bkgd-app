import { debounce } from '@utils'
import { useEffect, useState } from 'react'
import { EventHandler } from '@state/events'
import { Popover } from '@headlessui/react'

const deHandler = debounce(EventHandler, 200)

export default function RadialPosition({
  position,
  selectedLayer,
}: {
  position?: [number, number]
  selectedLayer: string
}) {
  const [[x, y], setXY] = useState<[number, number]>(position || [100, 100])
  useEffect(() => {
    setXY(position || [100, 100])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])

  return (
    <span className="inline-flex items-center">
      <label className="text-[10px] text-gray-300">Position</label>
      {/* Position */}
      <div className="flex cursor-pointer flex-row items-center justify-start gap-2">
        <span className="inline-flex flex-row items-center gap-2">
          <Popover className="relative">
            <Popover.Button className="ml-2">{x}%</Popover.Button>
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
            <Popover.Button className="ml-2">{y}%</Popover.Button>
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
    </span>
  )
}
