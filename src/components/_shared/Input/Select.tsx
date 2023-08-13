import { EventHandler } from '@state/events'
import { debounce } from '@utils'
import styles from './_.module.css'
import { useSelectedLayer } from '@state/global'
import { useCallback } from 'react'

const handler = debounce(EventHandler, 200)

/**
 * Select Input Type
 */
export default function Select({
  label,
  id = label,
  options,
  value,
  onChange,
  hideLabel = false,
}: {
  label: string
  options: (string | { value: string; label: string })[]
  id?: string
  value?: string
  /**
   * Optional onChange handler
   *
   * this will override the default EventHandler
   */
  onChange?(e: React.ChangeEvent<HTMLSelectElement>): void
  hideLabel?: boolean
}) {
  const [selectedLayer] = useSelectedLayer()

  const cb = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handler({
        action: 'bkgd-update-layer',
        payload: {
          id: selectedLayer,
          [id]: e.target.value,
        },
      })
    },
    [id, selectedLayer]
  )
  return (
    <div className={styles.wrap}>
      {!hideLabel && (
        <label htmlFor={label} className={styles.full}>
          {label}
        </label>
      )}
      <select id={label} value={value || ''} onChange={onChange || cb}>
        {options.map((option) => {
          return (
            <option
              key={typeof option === 'string' ? option : option.value}
              value={typeof option === 'string' ? option : option.value}
            >
              {typeof option === 'string' ? option : option.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}
