import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal, Toolbox } from '@phosphor-icons/react'
import { SelectedLayerID } from '@state/global'
import { Button } from '@shared'

import styles from './_.module.css'
import Tools from './Tools'
import LayerProperties from './LayerProperties'

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
        <div className={styles.card}>
          <div className={styles._head}>
            <h3>{mode}</h3>
          </div>
          <AnimatePresence initial={false} mode="wait">
            {mode === 'tools' && (
              <motion.div
                key="tools"
                transition={{ duration: 0.1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Tools />
              </motion.div>
            )}
            {mode === 'edit' && (
              <motion.div
                key="edit"
                transition={{ duration: 0.1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LayerProperties />
              </motion.div>
            )}
          </AnimatePresence>
          <div className={styles._foot}></div>
        </div>
      </div>
    </section>
  )
}
