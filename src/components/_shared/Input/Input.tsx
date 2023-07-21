import styles from './_.module.css'

/**
 * Default Input Type
 * @returns
 */
export default function Input<T extends string>({
  label,
  id,
}: {
  label: T
  id?: T
}) {
  return (
    <div className={styles.wrap}>
      <label htmlFor="opacity" className={styles.full}>
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
