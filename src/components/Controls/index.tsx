import { HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react'
import { SlidersHorizontal, Stack } from '@phosphor-icons/react'

import styles from './_.module.css'
import Tools from './Tools'
import LayerControls from './LayerControls'
import { IconButton } from '@shared'
import { makeID } from '@utils'
import { useSelectedLayer } from '@state/global'

type Mode = 'tools' | 'edit'
const id = makeID()

// FIXME: there is an issue on mount where sometimes the indicator is not set
const ActiveIndicator = ({
  indicator,
  children,
}: { indicator: string } & HTMLAttributes<HTMLDivElement>) => {
  const prev = useRef<string>()
  const wrapRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (wrapRef.current) {
      const child = wrapRef.current.querySelector(`#${indicator}`)
      if (child && prev.current !== indicator) {
        child.classList.toggle(styles.indicator)
        prev.current = indicator
      }
    }
  }, [indicator])

  return <div ref={wrapRef}>{children}</div>
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
  const wrapRef = useRef<HTMLDivElement>(null)
  const setActivePanel = (id: string) => {
    if (!wrapRef.current) return
    const el = wrapRef.current.querySelector(`#${id}`)
    if (el && id !== prev.current?.id) {
      el.classList.toggle(styles.active)
      if (prev.current) {
        prev.current.classList.toggle(styles.active)
      }
      prev.current = el
    }
  }

  setActivePanel(mode)
  return <div ref={wrapRef}>{children}</div>
}

export default function Controls() {
  const [mode, setMode] = useState<Mode>('tools')

  // FEATURE: If we find the rerenders a problem we can seperate sections of the UI to memo the components and handle thier state internally. This will allow us to only rerender the components that need to be rerendered.

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
