import { useEffect, useState } from 'react'
import { useSelectedLayer } from '@state/global'

import styles from './BackgroundPosition.module.css'
import { EventHandler } from '@state/events'
import debounce from '../../utils/debounce'

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
      <label className={styles.full}>{label}</label>
      <span>
        <label htmlFor={`${label}-x`}>X</label>
        <input
          step={10}
          type="range"
          min={-100}
          max={100}
          id={`${label}-x`}
          value={x}
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
      <span>
        <label htmlFor={`${label}-y`}>Y</label>
        <input
          step={10}
          type="range"
          min={-100}
          max={100}
          id={`${label}-y`}
          value={y}
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
  )
}
