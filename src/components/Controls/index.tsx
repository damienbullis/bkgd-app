import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, Stack } from '@phosphor-icons/react'
import { IconButton } from '@shared'

import styles from './_.module.css'
import Tools from './Tools'
import LayerControls from './LayerControls'
import { useSelectedLayer } from '@state/global'

type Mode = 'tools' | 'edit'

function generateSimpleId() {
  return Math.random().toString(36).substring(2, 7)
}

const ActiveIndicator = ({
  indicator,
  children,
}: { indicator: string } & HTMLAttributes<HTMLDivElement>) => {
  const prev = useRef<string>()
  const id = useRef(generateSimpleId())
  useEffect(() => {
    try {
      const wrap = document.querySelector(`#${id.current}`)

      if (wrap) {
        const child = wrap.querySelector(`#${indicator}`)

        if (child && prev.current !== indicator) {
          child.classList.toggle(styles.indicator)
          prev.current = indicator
        }
      }
    } catch (err) {
      console.log({ err })
    }
  }, [indicator])
  return <div id={id.current}>{children}</div>
}

export default function Controls() {
  const [mode, setMode] = useState<Mode>('tools')

  const [selectedLayer] = useSelectedLayer()

  useEffect(() => {
    if (selectedLayer) {
      setMode((prev) => (prev === 'tools' ? 'edit' : prev))
    } else {
      setMode((prev) => (prev === 'edit' ? 'tools' : prev))
    }
  }, [selectedLayer])

  return (
    <section id="controls" className={styles.wrap}>
      <div className={styles.layer}>
        <ActiveIndicator indicator={mode}>
          <div className={styles._head}>
            <IconButton
              id="tools"
              active={mode === 'tools'}
              onClick={() =>
                setMode((prev) => (prev === 'tools' ? prev : 'tools'))
              }
              icon={Stack}
            />
            <IconButton
              id="edit"
              active={mode === 'edit'}
              onClick={() =>
                setMode((prev) => (prev === 'edit' ? prev : 'edit'))
              }
              icon={SlidersHorizontal}
            />
          </div>
        </ActiveIndicator>
        <AnimatePresence initial={false} mode="wait">
          {/* TODO: Move these motion.div's inside inner components instead */}
          {mode === 'tools' && (
            // <motion.div
            //   key="tools"
            //   className={styles.card}
            //   transition={{ duration: 0.2 }}
            //   style={{ position: 'relative' }}
            //   initial={{ opacity: 0, left: '-100%' }}
            //   animate={{ opacity: 1, left: 0 }}
            //   exit={{ opacity: 0, left: '-100%' }}
            // >
            <Tools />
            // </motion.div>
          )}
          {mode === 'edit' && (
            // <motion.div
            //   key="edit"
            //   className={styles.card}
            //   transition={{ duration: 0.2 }}
            //   style={{ position: 'relative' }}
            //   initial={{ opacity: 0, left: '100%' }}
            //   animate={{ opacity: 1, left: 0 }}
            //   exit={{ opacity: 0, left: '100%' }}
            // >
            <LayerControls />
            // </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
