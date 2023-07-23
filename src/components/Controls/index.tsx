import { HTMLAttributes, useEffect, useRef, useState } from 'react'
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

// FIXME: there is an issue on mount where sometimes the indicator is not set
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
      // Why does this error some times?
      console.log({ err })
    }
  }, [indicator])
  return <div id={id.current}>{children}</div>
}

// FIXME: there is an issue on mount where sometimes the panel is not set
const ActivePanel = ({
  mode,
  children,
}: {
  mode: string
  children: React.ReactElement | React.ReactElement[]
}) => {
  const prev = useRef<Element>()
  const setActivePanel = (id: string) => {
    const el = document.querySelector(`#${id}`)
    if (el && id !== prev.current?.id) {
      el.classList.toggle(styles.active)

      if (prev.current) {
        prev.current.classList.toggle(styles.active)
      }
      prev.current = el
    }
  }

  setActivePanel(mode)
  return <>{children}</>
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
              icon={Stack}
              active={mode === 'tools'}
              onClick={() =>
                setMode((prev) => (prev === 'tools' ? prev : 'tools'))
              }
            />
            <IconButton
              id="edit"
              icon={SlidersHorizontal}
              active={mode === 'edit'}
              onClick={() =>
                setMode((prev) => (prev === 'edit' ? prev : 'edit'))
              }
            />
          </div>
        </ActiveIndicator>
        <div style={{ position: 'relative' }}>
          <ActivePanel mode={mode === 'tools' ? 'toolsPanel' : 'controlsPanel'}>
            <div id="toolsPanel" className={styles.card}>
              <Tools />
            </div>
            <div id="controlsPanel" className={styles.card}>
              <LayerControls />
            </div>
          </ActivePanel>
        </div>
      </div>
    </section>
  )
}
