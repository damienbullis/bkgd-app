import {
  At,
  CircleHalf,
  Command,
  DotsSixVertical,
  Eyedropper,
  Flask,
  Gradient,
  Palette,
  Rainbow,
  Stack,
} from '@phosphor-icons/react'
import { Button } from '@shared'
import styles from './_.module.css'

const Tools = () => {
  return (
    <div className={styles.tools}>
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
  )
}

export default Tools
