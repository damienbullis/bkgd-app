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

const LayerDropdown = ({ id, isActive }: { id: string; isActive: boolean }) => {
  const [menu, setMenu] = useState(false)
  const showEllipse = isActive ? styles.active : ''
  const showMenu = menu ? styles.active : ''

  const prevent =
    (fn: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log('prevent')
      e.preventDefault()
      e.stopPropagation()
      fn()
    }
  useEffect(() => {
    if (!isActive) setMenu(false)
  }, [isActive])
  return (
    <div className={styles.ellipse}>
      <IconButton
        icon={DotsThreeOutlineVertical}
        size="sm"
        disabled={!isActive}
        className={showEllipse}
        onClick={prevent(() => setMenu(!menu))}
      />
      <div className={`${styles.dropdown} ${showMenu}`}>
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
