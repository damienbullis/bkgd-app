import { useEffect, useRef, useState } from 'react'
import styles from './_.module.css'

const Shine = ({ text }: { text: string }) => {
  const el = useRef<HTMLParagraphElement>(null)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (el.current && !finished) {
      const styleSheet = document.styleSheets[0]
      const pseudoElementRule = `.shine::after { content: "${text}"; }`
      styleSheet.insertRule(pseudoElementRule)
      setFinished(true)
    }
  }, [el, text, finished])

  return (
    <p ref={el} className="shine">
      {text}
    </p>
  )
}

export default function Nav() {
  return (
    <nav id="nav" className={styles.wrap}>
      <span>
        <a href="/" className={`${styles.logo}`}>
          <Shine text="BKGD" />
        </a>
      </span>
      <ul className="clr">
        <li className="clr">Home</li>
      </ul>
      <ul className="clr">
        <li className="clr">Account</li>
      </ul>
    </nav>
  )
}
