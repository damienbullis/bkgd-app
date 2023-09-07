import {
  ArrowsCounterClockwise,
  Clipboard,
  Eye,
  EyeClosed,
  FloppyDisk,
  Icon,
} from '@phosphor-icons/react'
import { EventHandler } from '@state/events'
import { useVisible } from '@state/global'
import { IconButton, List } from '@shared'

import LayerButtons from './LayerButtons'
import styles from './_.module.css'
import { useNavigate } from '@tanstack/router'

const LiButton = ({
  icon,
  id,
  onClick,
}: {
  icon: Icon
  id?: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <li id={id}>
      <IconButton icon={icon} onClick={onClick} />
    </li>
  )
}

const VisibilityButton = () => {
  const [hide] = useVisible()
  return (
    <LiButton
      id="visibility-button"
      icon={hide ? EyeClosed : Eye}
      onClick={() =>
        EventHandler({
          action: 'toggle-ui',
          payload: null,
        })
      }
    />
  )
}

// TODO: Fix all these styles n buttons
export default function Layers() {
  const navigate = useNavigate()
  return (
    <aside id="layers" className={styles.wrap}>
      <List>
        <LiButton
          icon={Clipboard}
          onClick={() =>
            EventHandler({
              action: 'copy-css',
              payload: null,
            })
          }
        />
        <LiButton
          icon={FloppyDisk}
          onClick={() =>
            EventHandler({
              action: 'download-image',
              payload: null,
            })
          }
        />
        <VisibilityButton />
        <LiButton
          icon={ArrowsCounterClockwise}
          onClick={() => navigate({ to: '/' })}
        />
      </List>
      <LayerButtons />
    </aside>
  )
}
