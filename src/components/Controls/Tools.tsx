import { CircleHalf, Gradient, Palette } from '@phosphor-icons/react'
import { Button } from '@shared'
import styles from './_.module.css'
import { useLayer } from '@state/global'

const Tools = () => {
  const [layerId, setLayerId] = useLayer('ActiveLayerID')
  console.log(layerId)
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
