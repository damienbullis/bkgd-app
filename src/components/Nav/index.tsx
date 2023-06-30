import styles from './_.module.css'

export default function Nav() {
  return (
    <nav id="nav" className={styles.wrap}>
      <a href="/" className={styles.logo}>
        <p>BKGD</p>
      </a>
      <br />
      <ul>
        <li>Home</li>
      </ul>
      <br />
      <ul>
        <li>Account</li>
      </ul>
    </nav>
  )
}
