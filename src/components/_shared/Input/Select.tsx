import styles from './_.module.css'

/**
 * Select Input Type
 */
export default function Select({
  label,
  options,
  id,
}: {
  label: string
  options: (string | { value: string; label: string })[]
  id?: string
}) {
  return (
    <div className={styles.wrap}>
      <label htmlFor={id || label} className={styles.full}>
        {label}
      </label>
      <select id={id || label}>
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
