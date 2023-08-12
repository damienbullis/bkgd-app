import { useSelectedLayer } from '@state/global'
import styles from './_.module.css'
import debounce from '../../../utils/debounce'
import { EventHandler } from '@state/events'
import { useEffect, useRef } from 'react'

const handler = debounce(EventHandler, 200)

/**
 * Range Input Type
 */
export default function Range({
  label,
  id = label,
  value,
}: {
  label: string
  id?: string
  value?: number
}) {
  const [selectedLayer] = useSelectedLayer()
  const inputRef = useRef<HTMLInputElement>(null)
  const v = typeof value === 'number' ? value : 100
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = String(v)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])
  return (
    <div className={styles.wrap}>
      <label htmlFor={label} className={styles.full}>
        {label}
      </label>
      <input
        ref={inputRef}
        className="clr"
        type="range"
        id={label}
        defaultValue={v}
        min="0"
        max="100"
        onChange={(e) =>
          handler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              [id]: Number(e.target.value),
            },
          })
        }
      />
    </div>
  )
}
