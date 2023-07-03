import { useState } from 'react'
import styles from './_.module.css'
import Tools from './Tools'

type Mode = 'tools' | 'edit'

export default function Controls() {
  const [mode, setMode] = useState<Mode>('tools')
  return (
    <section id="controls" className={styles.wrap}>
      {<Tools mode={mode} setMode={setMode} />}
      {mode === 'edit' && <div>Edit</div>}
    </section>
  )
}
