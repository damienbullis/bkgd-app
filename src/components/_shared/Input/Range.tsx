import { useSelectedLayer } from '@state/global'
import styles from './_.module.css'
import debounce from '../../../utils/debounce'
import { EventHandler } from '@state/events'
import { useEffect, useRef } from 'react'

const handler = debounce(EventHandler, 200)
const prevLayer = {
  id: '',
}

/**
 * Range Input Type
 */
export default function Range({
  label,
  value,
}: {
  label: string
  value?: number
}) {
  const [selectedLayer] = useSelectedLayer()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // because this in an uncontrolled input
    // when selectedLayer changes, we need to update the value manually
    if (inputRef.current) {
      // console.log('UPDATING RANGE', { value })
      // prevLayer.id = selectedLayer
      inputRef.current.value = `${typeof value === 'number' ? value : 100}`
    }
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
        defaultValue={typeof value === 'number' ? value : 100}
        min="0"
        max="100"
        onChange={(e) =>
          handler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              [label.toLocaleLowerCase()]: Number(e.target.value),
            },
          })
        }
      />
    </div>
  )
}
