import styles from './_.module.css'

export default function Layers() {
  return (
    <aside id="layers" className={styles.wrap}>
      <div className={styles.controls}>
        <button className={styles.btn}>+</button>
        <button className={styles.btn}>-</button>
        <button className={styles.btn}>x</button>
      </div>
      <div>
        <ul>
          <li>Layer 1</li>
          <li>Layer 2</li>
        </ul>
      </div>
    </aside>
  )
}
