import { CircleHalf, Gradient, Palette } from '@phosphor-icons/react'
import { Button } from '@shared'
import styles from './_.module.css'
import { useSelectedLayer } from '@state/global'

const Tools = () => {
  const [layerId, setLayerId] = useSelectedLayer()
  return (
    <div className={styles.tools}>
      <Button onClick={() => setLayerId('palette')}>
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
