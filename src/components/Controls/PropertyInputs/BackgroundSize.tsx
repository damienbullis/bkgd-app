import { useEffect, useState } from 'react'
import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'
import styles from './BackgroundSize.module.css'
import { MinusSquare, PlusSquare } from '@phosphor-icons/react'
import { debounce } from '@utils'

const deHandler = debounce(EventHandler, 200)

const getSizeValue = (value = ''): [string, string] | string => {
  if (value === '') return '100'
  if (/\s/.test(value)) {
    const [x, y] = value.split(' ')
    return [x.replace('%', ''), y.replace('%', '')]
  }
  return value.replace('%', '')
}

export default function BackgroundSize({ value }: { value?: string }) {
  const [xy, setXY] = useState<[string, string] | string>(getSizeValue(value))
  const [selectedLayer] = useSelectedLayer()
  useEffect(() => {
    setXY(getSizeValue(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])

  return (
    <div className={styles.wrap}>
      <div className="flex h-10 w-full flex-row flex-nowrap items-stretch gap-2">
        <span className="relative flex w-full items-center">
          <span className="absolute left-3 text-sm text-gray-300">
            {typeof xy === 'string' ? 'X & Y' : 'X'}
          </span>
          <input
            step={10}
            type="number"
            value={typeof xy === 'string' ? xy : xy[0]}
            className="flex h-full w-full appearance-none rounded-md border-none bg-transparent p-2 px-7 text-right leading-tight tracking-widest text-white ring-1 ring-inset ring-gray-300 hover:ring-white focus:ring-white active:ring-white"
            onChange={(e) =>
              setXY((prev) => {
                if (typeof prev === 'string') {
                  deHandler({
                    action: 'bkgd-update-layer',
                    payload: {
                      id: selectedLayer,
                      backgroundSize: `${e.target.value}%`,
                    },
                  })
                  return e.target.value || '100'
                } else {
                  const next: [string, string] = [
                    e.target.value || '100',
                    prev[1],
                  ]
                  deHandler({
                    action: 'bkgd-update-layer',
                    payload: {
                      id: selectedLayer,
                      backgroundSize: `${next[0]}% ${next[1]}%`,
                    },
                  })
                  return next
                }
              })
            }
          />

          <span className="absolute right-3 text-sm text-gray-300">%</span>
        </span>
        {typeof xy === 'string' ? null : (
          <span className="relative flex w-full items-center">
            <label className="absolute left-3 text-gray-200">Y</label>
            <input
              step={10}
              type="number"
              value={xy[1]}
              className="font- flex h-full w-full appearance-none rounded-md border-none bg-transparent p-2 px-7 text-right leading-tight tracking-widest text-gray-200 ring-1 ring-inset ring-gray-200"
              onChange={(e) =>
                setXY((prev) => {
                  const next: [string, string] = [
                    prev[0],
                    e.target.value || '100',
                  ]
                  deHandler({
                    action: 'bkgd-update-layer',
                    payload: {
                      id: selectedLayer,
                      backgroundSize: `${next[0]}% ${next[1]}%`,
                    },
                  })
                  return next
                })
              }
            />

            <span className="absolute right-3">%</span>
          </span>
        )}
        <button
          className="transform text-3xl transition active:scale-95"
          onClick={() =>
            setXY((prev) => {
              if (typeof prev === 'string') {
                return [prev, prev]
              } else {
                return prev[0]
              }
            })
          }
        >
          {typeof xy === 'string' ? <PlusSquare /> : <MinusSquare />}
        </button>
      </div>
      {/* <Select
        id={label}
        label="Size"
        hideLabel
        options={['default', 'single', 'double']}
        value={sizeType}
        onChange={(e) => setSizeType(e.target.value as SizeOptions)}
      />
      <SizeController
        type={sizeType}
        value={value as BackgroundSizeType}
        selectedLayer={selectedLayer}
      /> */}
    </div>
  )
}
