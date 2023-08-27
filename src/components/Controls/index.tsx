import { Children, cloneElement, useEffect, useState } from 'react'
import { SlidersHorizontal, Stack } from '@phosphor-icons/react'

import { useSelectedLayer } from '@state/global'
import { IconButton } from '@shared'

import styles from './_.module.css'
import Tools from './Tools'
import LayerProperties from './LayerProperties'

type Mode = 'tools' | 'edit'

const ToggleStyle = ({
  target,
  applyClass,
  inactiveClass = '',
  children,
}: {
  target: string
  applyClass: string
  inactiveClass?: string
  children: React.ReactElement | React.ReactElement[]
}) => (
  <>
    {Children.map(children, (child) =>
      cloneElement(child, {
        className: `${child.props.className || ''} ${
          child.props.id === target ? applyClass : inactiveClass
        }`,
      })
    )}
  </>
)

const Panel = ({
  id,
  className,
  children,
}: {
  id: string
  className: string
  children: React.ReactNode
}) => {
  return (
    <div
      id={id}
      className={
        `absolute right-0 top-0 rounded-lg p-4 shadow-xl 
        backdrop-blur-3xl backdrop-brightness-50 ` + className
      }
    >
      {children}
    </div>
  )
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
    <section
      id="controls"
      className="grid h-full w-full place-items-start justify-items-end"
    >
      <div className={styles.layer}>
        <ul className="inline-grid h-12 grid-flow-col items-center gap-2">
          <ToggleStyle target={mode} applyClass={styles.indicator}>
            <li id="tools">
              <IconButton
                icon={Stack}
                active={mode === 'tools'}
                onClick={() =>
                  setMode((prev) => (prev === 'tools' ? prev : 'tools'))
                }
              />
            </li>
            <li id="edit">
              <IconButton
                icon={SlidersHorizontal}
                active={mode === 'edit'}
                onClick={() =>
                  setMode((prev) => (prev === 'edit' ? prev : 'edit'))
                }
              />
            </li>
          </ToggleStyle>
        </ul>
        <div className="relative">
          <ToggleStyle
            target={mode === 'tools' ? 'toolsPanel' : 'controlsPanel'}
            applyClass={styles.active}
            inactiveClass={styles.inactive}
          >
            <Panel id="toolsPanel" className={styles.card}>
              <Tools />
            </Panel>
            <Panel id="controlsPanel" className={styles.card}>
              <LayerProperties />
            </Panel>
          </ToggleStyle>
        </div>
      </div>
    </section>
  )
}
