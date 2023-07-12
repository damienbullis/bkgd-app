import { useEffect, useState } from 'react'
import styles from './_.module.css'
import Tools from './Tools'
import { SelectedLayerID } from '../../state/global'
import { Button } from '../_shared'
import { SlidersHorizontal, Toolbox } from '@phosphor-icons/react'

type Mode = 'tools' | 'edit'

export default function Controls() {
  const [mode, setMode] = useState<Mode>('tools')

  useEffect(() => {
    const unsub = SelectedLayerID.subscribe((id) => {
      if (id) {
        setMode((prev) => (prev === 'tools' ? 'edit' : prev))
      } else {
        setMode((prev) => (prev === 'edit' ? 'tools' : prev))
      }
    })
    return () => {
      unsub()
    }
  }, [])

  return (
    <section id="controls" className={styles.wrap}>
      <div className={styles._content}>
        <div className={styles._head}>
          <Button
            className={mode === 'tools' ? styles.active : ''}
            onClick={() =>
              setMode((prev) => (prev === 'tools' ? prev : 'tools'))
            }
          >
            <Toolbox size="1.618rem" />
          </Button>
          <Button
            className={mode === 'edit' ? styles.active : ''}
            onClick={() => setMode((prev) => (prev === 'edit' ? prev : 'edit'))}
          >
            <SlidersHorizontal size="1.618rem" />
          </Button>
        </div>
        <Tools />
        <div className={styles._foot}></div>
      </div>
      {mode === 'edit' && <div>Edit</div>}
    </section>
  )
}
