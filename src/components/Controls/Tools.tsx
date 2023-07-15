import { CircleHalf, Gradient, Palette } from '@phosphor-icons/react'
import { Button } from '@shared'
import styles from './_.module.css'

const Tools = () => {
  return (
    <div className={styles.tools}>
      <Button>
        <Palette size={32} />
      </Button>

      <Button>
        <CircleHalf size={32} />
      </Button>

      <Button>
        <Gradient size={32} />
      </Button>
    </div>
  )
}

export default Tools
