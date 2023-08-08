import { Children, cloneElement, useEffect, useState } from 'react'
import { SlidersHorizontal, Stack } from '@phosphor-icons/react'

import { useSelectedLayer } from '@state/global'
import { IconButton } from '@shared'

import styles from './_.module.css'
import Tools from './Tools'
import LayerControls from './LayerControls'

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
        className: `${child.props.className} ${
          child.props.id === target ? applyClass : inactiveClass
        }`,
      })
    )}
  </>
)

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
        <div className={styles._head}>
          <ToggleStyle target={mode} applyClass={styles.indicator}>
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
          </ToggleStyle>
        </div>
        <div style={{ position: 'relative' }}>
          <ToggleStyle
            target={mode === 'tools' ? 'toolsPanel' : 'controlsPanel'}
            applyClass={styles.active}
            inactiveClass={styles.inactive}
          >
            <div id="toolsPanel" className={styles.card}>
              <Tools />
            </div>
            <div id="controlsPanel" className={styles.card}>
              <LayerControls />
            </div>
          </ToggleStyle>
        </div>
      </div>
    </section>
  )
}
