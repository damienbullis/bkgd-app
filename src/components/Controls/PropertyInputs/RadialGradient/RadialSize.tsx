import { useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import { EventHandler } from '@state/events'
import { debounce } from '@utils'
import { set } from 'zod'

const deHandler = debounce(EventHandler, 200)

export default function RadialSize({
  size,
  selectedLayer,
}: {
  size: [number, number]
  selectedLayer: string
}) {
  const [[x, y], setPos] = useState(size)

  useEffect(() => {
    setPos(size)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])

  return (
    <span className="inline-flex flex-row items-center gap-2">
      <label className="text-[10px] text-gray-300">Size</label>
      {/* Size */}
      <Popover className="relative">
        <Popover.Button>{x}%</Popover.Button>
        <Popover.Panel className="absolute z-10 rounded-md bg-[#00000099] px-4 py-2 shadow-2xl shadow-black backdrop-brightness-50">
          <input
            id={'radial-size-x'}
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
              setPos([Number(e.target.value), y])
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'radial',
                    size: [Number(e.target.value), y],
                  },
                },
              })
            }}
          />
        </Popover.Panel>
      </Popover>
      <Popover className="relative">
        <Popover.Button>{y}%</Popover.Button>
        <Popover.Panel className="absolute z-10 rounded-md bg-[#00000099] px-4 py-2 shadow-2xl shadow-black backdrop-brightness-50">
          <input
            id={'radial-size-y'}
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
              setPos([x, Number(e.target.value)])
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'radial',
                    size: [x, Number(e.target.value)],
                  },
                },
              })
            }}
          />
        </Popover.Panel>
      </Popover>
    </span>
  )
}
