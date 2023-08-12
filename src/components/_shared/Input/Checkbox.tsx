import { useSelectedLayer } from '@state/global'
import styles from './_.module.css'
import { useEffect, useRef } from 'react'
import { EventHandler } from '@state/events'

/**
 * Checkbox Input Type
 */
export default function Checkbox({
  label,
  id = label,
  value,
}: {
  label: string
  id?: string
  value?: boolean
}) {
  const [selectedLayer] = useSelectedLayer()
  const r = useRef<HTMLInputElement>(null)
  const v = typeof value === 'boolean' ? value : false
  useEffect(() => {
    if (r.current) {
      r.current.checked = v
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])
  return (
    <div className={styles.wrap}>
      <label htmlFor={label}>{label}</label>
      <input
        ref={r}
        id={label}
        type="checkbox"
        defaultChecked={v}
        onChange={(e) =>
          EventHandler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              [id]: e.target.checked,
            },
          })
        }
      />
    </div>
  )
}
