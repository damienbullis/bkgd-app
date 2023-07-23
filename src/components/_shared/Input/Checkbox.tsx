import styles from './_.module.css'

/**
 * Range Input Type
 */
export default function Checkbox({
  label,
  id,
}: {
  label: string
  id?: string
}) {
  return (
    <div className={styles.wrap}>
      <label htmlFor={id || label}>{label}</label>
      <input id={id || label} type="checkbox" />
    </div>
  )
}
