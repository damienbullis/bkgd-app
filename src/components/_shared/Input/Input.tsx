import styles from './_.module.css'

/**
 * Default Input Type
 * @returns
 */
export default function Input({ label, id }: { label: string; id?: string }) {
  return (
    <div className={styles.wrap}>
      <label htmlFor={id || label} className={styles.full}>
        {label}
      </label>
      <input
        type="text"
        id={id || label}
        placeholder={'Placeholder ' + (id || label)}
        disabled
      />
    </div>
  )
}
