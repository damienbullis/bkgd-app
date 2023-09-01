import { useEffect, useState } from 'react'
import { useSelectedLayer } from '@state/global'

import styles from './BackgroundPosition.module.css'
import { EventHandler } from '@state/events'
import { debounce } from '@utils'

const getPositionValue = (value = ''): [number, number] => {
  if (/\s/.test(value)) {
    const [x, y] = value.split(' ')
    return [Number(x.replace('%', '')), Number(y.replace('%', ''))]
  }
  return [0, 0]
}

const label = 'Background Position'

const deHandler = debounce(EventHandler, 200)

export default function BackgroundPosition({ value }: { value?: string }) {
  const [[x, y], setXY] = useState<[number, number]>(getPositionValue(value))
  const [selectedLayer] = useSelectedLayer()
  useEffect(() => {
    setXY(getPositionValue(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])

  return (
    <div className={styles.wrap}>
      <div className="my-2 flex w-full flex-row items-baseline justify-start gap-2">
        <label className="whitespace-nowrap">{label}</label>
        <span className="relative flex w-full items-center">
          <label className="absolute left-3">X</label>
          <input
            step={10}
            type="number"
            value={x}
            className="flex w-full appearance-none rounded-md border-none bg-transparent px-2 py-1 pl-7 leading-tight text-gray-200 ring-1 ring-white "
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
        </span>
        <span className="relative flex w-full items-center">
          <label className="absolute left-3">Y</label>
          <input
            step={10}
            type="number"
            value={y}
            className="flex w-full appearance-none rounded-md border-none bg-transparent px-2 py-1 pl-7 leading-tight text-gray-200 ring-1 ring-white"
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
        </span>
      </div>
    </div>
  )
}
