import styles from './_.module.css'

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
  return (
    <div className={styles.wrap}>
      <label htmlFor={label} className={styles.full}>
        {label}
      </label>
      <input
        type="range"
        id={label}
        value={value || 100}
        min="0"
        max="100"
        onChange={(e) => console.log('Range', e)}
      />
    </div>
  )
}
