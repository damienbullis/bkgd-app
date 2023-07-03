import styles from './_.module.css'
import { FloppyDisk, UserCircle } from '@phosphor-icons/react'
import { Button, Shine } from '../_shared'

export default function Nav() {
  return (
    <nav id="nav" className={styles.wrap}>
      <span>
        <a href="/" className={styles.logo}>
          <Shine>BKGD</Shine>
        </a>
      </span>
      <ul className="clr">
        <li className="clr">
          <Button disabled>
            <FloppyDisk size={32} />
          </Button>
        </li>
      </ul>
      <ul className="clr">
        <li className="clr">
          <Button disabled>
            <UserCircle size={32} />
          </Button>
        </li>
      </ul>
    </nav>
  )
}
