import {
  ArrowBendLeftUp,
  ArrowBendRightDown,
  DotsThreeOutlineVertical,
  TrashSimple,
} from '@phosphor-icons/react'
import IconButton from '../../_shared/IconButton'
import { EventHandler } from '@state/events'
import styles from './_.module.css'
import { useEffect, useState } from 'react'

const checkStack = (stack: string[], id: string) => {
  const index = stack.indexOf(id)
  const isBottom = index === stack.length - 1
  const isTop = index === 0
  console.log('checkStack', { stack, id, isTop, isBottom })
  return { isTop, isBottom }
}

const Hide = ({
  condition,
  children,
}: {
  condition: boolean
  children: React.ReactNode
}) => {
  console.log('hide', condition)
  return condition ? null : <>{children}</>
}

const LayerDropdown = ({
  id,
  isActive,
  stack,
}: {
  id: string
  isActive: boolean
  stack: string[]
}) => {
  const [menu, setMenu] = useState(false)
  const showEllipse = isActive ? styles.active : ''
  const showMenu = menu ? styles.active : ''

  const prevent =
    (fn: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
      // console.log('prevent')
      e.preventDefault()
      e.stopPropagation()
      fn()
    }
  useEffect(() => {
    if (!isActive) setMenu(false)
  }, [isActive])

  const _stack = checkStack(stack, id)
  return (
    <div
      className={styles.ellipse}
      onBlur={(e) => {
        if (e.relatedTarget) return
        setMenu(false)
      }}
    >
      <IconButton
        icon={DotsThreeOutlineVertical}
        size="sm"
        disabled={!isActive}
        className={showEllipse}
        onClick={prevent(() => setMenu(!menu))}
      />
      <div className={`${styles.dropdown} ${showMenu}`}>
        <Hide condition={_stack.isTop}>
          <IconButton
            icon={ArrowBendLeftUp}
            size="sm"
            onClick={prevent(() =>
              EventHandler({
                action: 'bkgd-update-stack',
                payload: {
                  id,
                  direction: 'up',
                },
              })
            )}
          />
        </Hide>
        <Hide condition={_stack.isBottom}>
          <IconButton
            icon={ArrowBendRightDown}
            size="sm"
            onClick={prevent(() =>
              EventHandler({
                action: 'bkgd-update-stack',
                payload: {
                  id,
                  direction: 'down',
                },
              })
            )}
          />
        </Hide>
        <IconButton
          icon={TrashSimple}
          size="sm"
          onClick={prevent(() =>
            EventHandler({
              action: 'bkgd-remove-layer',
              payload: { id },
            })
          )}
        />
      </div>
    </div>
  )
}

export default LayerDropdown
