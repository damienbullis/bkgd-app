import styles from './_.module.css'
import { IconButton, List } from '../_shared'
import { useState } from 'react'
import { LayerButtons } from './LayerButtons'
import {
  Clipboard,
  DownloadSimple,
  Eye,
  EyeClosed,
  Icon,
} from '@phosphor-icons/react'
import { EventHandler } from '@state/events'

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
  const [hide, setHide] = useState(false)
  return (
    <LiButton
      icon={hide ? EyeClosed : Eye}
      onClick={() => setHide((prev) => !prev)}
    />
  )
}

export default function Layers() {
  return (
    <aside id="layers" className={styles.wrap}>
      <List>
        <LiButton
          icon={DownloadSimple}
          onClick={EventHandler({
            action: 'bkgd-add-layer',
            payload: {
              id: 'some_id',
            },
          })}
        />
        <LiButton icon={Clipboard} onClick={() => console.log('copy')} />
        <VisibilityButton />
      </List>
      <LayerButtons />
    </aside>
  )
}
