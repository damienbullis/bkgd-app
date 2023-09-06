import { useEffect, useState } from 'react'
import { useSelectedLayer } from '@state/global'

import { EventHandler } from '@state/events'
import { debounce, getPositionValue } from '@utils'

const deHandler = debounce(EventHandler, 200)

export default function BackgroundPosition({ value }: { value?: string }) {
  const [[x, y], setXY] = useState<[number, number]>(getPositionValue(value))
  const [selectedLayer] = useSelectedLayer()
  useEffect(() => {
    setXY(getPositionValue(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])

  return (
    <>
      <div className="flex h-10 w-full flex-row items-stretch justify-start gap-2">
        <span className="relative flex w-full items-center">
          <span className="absolute left-3 text-sm text-gray-300">X</span>
          <input
            step={10}
            type="number"
            value={x}
            className="flex h-full w-full appearance-none rounded-md border-none bg-transparent p-2 px-7 
            text-right leading-tight tracking-widest text-white ring-1 ring-inset ring-gray-300 
            hover:ring-white active:ring-white"
            onChange={(e) =>
              setXY((prev) => {
                const next: [number, number] = [Number(e.target.value), prev[1]]
                deHandler({
                  action: 'bkgd-update-layer',
                  payload: {
                    id: selectedLayer,
                    backgroundPosition: `${next[0]}% ${next[1]}%`,
                  },
                })
                return next
              })
            }
          />

          <span className="absolute right-3 text-sm text-gray-300">%</span>
        </span>
        <span className="relative flex w-full items-center">
          <span className="absolute left-3 text-sm text-gray-300">Y</span>
          <input
            step={10}
            type="number"
            value={y}
            className="flex h-full w-full appearance-none rounded-md border-none bg-transparent p-2 px-7 text-right leading-tight tracking-widest text-white ring-1 ring-inset ring-gray-300 
            hover:ring-white active:ring-white"
            onChange={(e) => {
              setXY((prev) => {
                const next: [number, number] = [prev[0], Number(e.target.value)]
                deHandler({
                  action: 'bkgd-update-layer',
                  payload: {
                    id: selectedLayer,
                    backgroundPosition: `${next[0]}% ${next[1]}%`,
                  },
                })
                return next
              })
            }}
          />

          <span className="absolute right-3 text-sm text-gray-300">%</span>
        </span>
      </div>
    </>
  )
}
