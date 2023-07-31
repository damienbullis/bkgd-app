import styles from './_.module.css'

/**
 * Select Input Type
 */
export default function Select({
  label,
  options,
  value,
}: {
  label: string
  options: (string | { value: string; label: string })[]
  value?: string
}) {
  return (
    <div className={styles.wrap}>
      <label htmlFor={label} className={styles.full}>
        {label}
      </label>
      <select id={label} value={value}>
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
