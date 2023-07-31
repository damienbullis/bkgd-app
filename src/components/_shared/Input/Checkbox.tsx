import styles from './_.module.css'

/**
 * Range Input Type
 */
export default function Checkbox({
  label,
  value,
}: {
  label: string
  value?: boolean
}) {
  return (
    <div className={styles.wrap}>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type="checkbox"
        checked={value || false}
        onChange={(e) => console.log('Checkbox', e)}
      />
    </div>
  )
}
