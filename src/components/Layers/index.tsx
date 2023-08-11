import {
  Clipboard,
  DownloadSimple,
  Eye,
  EyeClosed,
  Icon,
} from '@phosphor-icons/react'
import { EventHandler } from '@state/events'
import { useVisible } from '@state/global'
import { IconButton, List } from '@shared'

import LayerButtons from './LayerButtons'
import styles from './_.module.css'

const LiButton = ({
  icon,
  onClick,
}: {
  icon: Icon
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <li>
      <IconButton icon={icon} onClick={onClick} />
    </li>
  )
}

const VisibilityButton = () => {
  const [hide] = useVisible()
  return (
    <LiButton
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

export default function Layers() {
  return (
    <aside id="layers" className={styles.wrap}>
      <List>
        <LiButton
          icon={DownloadSimple}
          onClick={() =>
            EventHandler({
              action: 'download-image',
              payload: null,
            })
          }
        />
        <LiButton
          icon={Clipboard}
          onClick={() =>
            EventHandler({
              action: 'copy-css',
              payload: null,
            })
          }
        />
        <VisibilityButton />
      </List>
      <LayerButtons />
    </aside>
  )
}
