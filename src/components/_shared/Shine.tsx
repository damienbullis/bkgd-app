import styles from './Shine.module.css'

/**
 *
 * Shiny Text
 */
const Shine = ({ children }: { children: string }) => {
  return (
    <p className={styles.wrap}>
      {children}
      <span>{children}</span>
    </p>
  )
}

export default Shine
