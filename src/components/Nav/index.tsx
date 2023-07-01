import { ButtonHTMLAttributes } from 'react'
import styles from './_.module.css'
import { FloppyDisk, UserCircle } from '@phosphor-icons/react'

// NEXT: code split
const Shine = ({ children }: { children: string }) => {
  return (
    <p className="shine">
      {children}
      <span>{children}</span>
    </p>
  )
}
// NEXT: code split
const NavButton = ({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={className ? className + ' ' : '' + 'clr'} {...rest}>
      {children}
    </button>
  )
}

export default function Nav() {
  return (
    <nav id="nav" className={styles.wrap}>
      <span>
        <a href="/" className={`${styles.logo}`}>
          <Shine>BKGD</Shine>
        </a>
      </span>
      <ul className="clr">
        <li className="clr">
          <NavButton disabled>
            <FloppyDisk size={32} />
          </NavButton>
        </li>
      </ul>
      <ul className="clr">
        <li className="clr">
          <NavButton disabled>
            <UserCircle size={32} />
          </NavButton>
        </li>
      </ul>
    </nav>
  )
}
