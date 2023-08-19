import { useEffect, useRef, useState } from 'react'
import { useSelectedLayer } from '@state/global'

import styles from './BackgroundPosition.module.css'

const getPositionValue = (value = ''): [number, number] => {
  if (/\s/.test(value)) {
    const [x, y] = value.split(' ')
    return [Number(x.replace('%', '')), Number(y.replace('%', ''))]
  }
  return [0, 0]
}

const label = 'Background Position'

export default function BackgroundPosition({ value }: { value?: string }) {
  const xRef = useRef<HTMLInputElement>(null)
  const yRef = useRef<HTMLInputElement>(null)
  const [[x, y], setXY] = useState<[number, number]>(getPositionValue(value))
  const [selectedLayer] = useSelectedLayer()
  useEffect(() => {
    if (xRef.current && yRef.current) {
      const [nextX, nextY] = getPositionValue(value)
      setXY([nextX, nextY])
      xRef.current.value = nextX.toString()
      yRef.current.value = nextY.toString()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])

  return (
    <div className={styles.wrap}>
      <label htmlFor={label} className={styles.full}>
        {label}
      </label>
      <input
        ref={xRef}
        type="range"
        min={-100}
        max={100}
        id={`${label}-x`}
        defaultValue={x}
      />
      <input
        ref={yRef}
        type="range"
        min={-100}
        max={100}
        id={`${label}-y`}
        defaultValue={y}
      />
    </div>
  )
}
