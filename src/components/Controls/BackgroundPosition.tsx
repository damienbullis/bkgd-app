import { useRef } from 'react'
import styles from './BackgroundPosition.module.css'

export default function BackgroundPosition(
  {
    label,
    id = label,
    value,
  }: { label: string; id?: string; value?: number | string } = {
    label: 'background-position',
  }
) {
  const inputRef = useRef<HTMLInputElement>(null)
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
        defaultValue={value}
      />
    </div>
  )
}
