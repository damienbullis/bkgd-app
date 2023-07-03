import {
  At,
  CircleHalf,
  Command,
  DotsSixVertical,
  Eyedropper,
  Flask,
  Gear,
  Gradient,
  Palette,
  Rainbow,
  Stack,
  Toolbox,
} from '@phosphor-icons/react'
import { Button } from '../_shared'
import styles from './_.module.css'

type Mode = 'tools' | 'edit'

const Tools = ({
  mode,
  setMode,
}: {
  mode: Mode
  setMode: React.Dispatch<React.SetStateAction<Mode>>
}) => {
  return (
    <div className={styles.tools}>
      <div className={styles._head}>
        <Button
          className={mode === 'tools' ? styles.active : ''}
          onClick={() => setMode((prev) => (prev === 'tools' ? prev : 'tools'))}
        >
          <Toolbox size="1.618rem" />
        </Button>
        <Button
          className={mode === 'edit' ? styles.active : ''}
          onClick={() => setMode((prev) => (prev === 'edit' ? prev : 'edit'))}
        >
          <Gear size="1.618rem" />
        </Button>
      </div>
      <div className={styles._content}>
        <div className={styles._head}></div>
        <div className={styles._foot}></div>
        <div className={styles._content}>
          <Button>
            <Stack size={32} />
          </Button>
          <Button>
            <Eyedropper size={32} />
          </Button>
          <Button>
            <Flask size={32} />
          </Button>
          <Button>
            <At size={32} />
          </Button>
          <Button>
            <CircleHalf size={32} />
          </Button>
          <Button>
            <Command size={32} />
          </Button>
          <Button>
            <DotsSixVertical size={32} />
          </Button>
          <Button>
            <Palette size={32} />
          </Button>
          <Button>
            <Rainbow size={32} />
          </Button>
          <Button>
            <Gradient size={32} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Tools
