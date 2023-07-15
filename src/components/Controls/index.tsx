import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal, Toolbox } from '@phosphor-icons/react'
import { Layer } from '@state/global'
import { Button } from '@shared'

import styles from './_.module.css'
import Tools from './Tools'
import LayerControls from './LayerControls'

type Mode = 'tools' | 'edit'

export default function Controls() {
  const [mode, setMode] = useState<Mode | null>(null)

  useEffect(() => {
    const [unsub, initial] = Layer.ActiveLayerID.subscribe((id) => {
      if (id) {
        setMode((prev) => (prev === 'tools' ? 'edit' : prev))
      } else {
        setMode((prev) => (prev === 'edit' ? 'tools' : prev))
      }
    })
    setMode((prev) => {
      if (prev === null) return initial ? 'edit' : 'tools'
      return prev
    })

    return () => {
      unsub()
    }
  }, [])

  return (
    <section id="controls" className={styles.wrap}>
      <div className={styles.layer}>
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
        <AnimatePresence initial={false} mode="wait">
          {mode === 'tools' && (
            <motion.div
              key="tools"
              className={styles.card}
              transition={{ duration: 0.2 }}
              style={{ position: 'relative' }}
              initial={{ opacity: 0, left: '-100%' }}
              animate={{ opacity: 1, left: 0 }}
              exit={{ opacity: 0, left: '-100%' }}
            >
              <Tools />
            </motion.div>
          )}
          {mode === 'edit' && (
            <motion.div
              key="edit"
              className={styles.card}
              transition={{ duration: 0.2 }}
              style={{ position: 'relative' }}
              initial={{ opacity: 0, left: '100%' }}
              animate={{ opacity: 1, left: 0 }}
              exit={{ opacity: 0, left: '100%' }}
            >
              <LayerControls />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
