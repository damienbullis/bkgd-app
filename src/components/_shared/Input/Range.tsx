import styles from './_.module.css'

/**
 * Range Input Type
 */
export default function Range({ label, id }: { label: string; id?: string }) {
  return (
    <div className={styles.wrap}>
      <label htmlFor={id || label} className={styles.full}>
        {label}
      </label>
      <input
        type="range"
        id={id || label}
        defaultValue="100"
        min="0"
        max="100"
      />
    </div>
  )
}
