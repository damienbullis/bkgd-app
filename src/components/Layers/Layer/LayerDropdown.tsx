import {
  ArrowBendLeftUp,
  ArrowBendRightDown,
  DotsThreeOutlineVertical,
  TrashSimple,
} from '@phosphor-icons/react'
import IconButton from '../../_shared/IconButton'
import { EventHandler } from '@state/events'
import styles from './_.module.css'

const LayerDropdown = ({ id, isActive }: { id: string; isActive: boolean }) => {
  return (
    <div className={styles.ellipse}>
      <IconButton icon={DotsThreeOutlineVertical} size="sm" active={isActive} />
      <div className={styles.dropdown}>
        <IconButton
          icon={ArrowBendLeftUp}
          size="sm"
          onClick={() =>
            EventHandler({
              action: 'bkgd-update-stack',
              payload: {
                id,
                direction: 'up',
              },
            })
          }
        />
        <IconButton
          icon={ArrowBendRightDown}
          size="sm"
          onClick={() =>
            EventHandler({
              action: 'bkgd-update-stack',
              payload: {
                id,
                direction: 'down',
              },
            })
          }
        />
        <IconButton
          icon={TrashSimple}
          size="sm"
          onClick={() =>
            EventHandler({
              action: 'bkgd-remove-layer',
              payload: { id },
            })
          }
        />
      </div>
    </div>
  )
}

export default LayerDropdown
