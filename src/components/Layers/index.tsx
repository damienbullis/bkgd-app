import styles from './_.module.css'
import { Button, List } from '../_shared'
import { Eyedropper, Plus, Stack, Trash } from '@phosphor-icons/react'

const LayerButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <li>
      <Button>{children}</Button>
    </li>
  )
}

export default function Layers() {
  return (
    <aside id="layers" className={styles.wrap}>
      <List>
        <li>
          <Button>
            <Plus size={'1.618rem'} />
          </Button>
        </li>
        <li>
          <Button>
            <Trash size={'1.618rem'} />
          </Button>
        </li>
      </List>
      <List>
        <LayerButton>
          <Stack size={32} />
        </LayerButton>
        <LayerButton>
          <Eyedropper size={32} />
        </LayerButton>
      </List>
    </aside>
  )
}
