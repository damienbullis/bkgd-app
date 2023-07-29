import { CircleHalf, Gradient, Palette } from '@phosphor-icons/react'
import { Button } from '@shared'
import styles from './_.module.css'
import { useSelectedLayer } from '@state/global'
import { calcAverageColor, makeID } from '@utils'
import { useNavigate } from '@tanstack/router'

const stateChange = (title: string, fn: () => void) => {
  return () => {
    // calcAverageColor()
    const headEl = document.head
    const titleEl = headEl.querySelector('title')
    if (titleEl) titleEl.textContent = title
    fn()
  }
}

const Tools = () => {
  const [, setSelectedLayer] = useSelectedLayer()
  const nav = useNavigate({ from: '/' })
  /**
   * TODO: LAYER MANAGER
   *
   * We need to create a component / hook that will manage the layers
   * handle adding, removing, selecting, and reordering layers
   *
   * Drag and drop reordering
   *
   * TODO: ACTION EVENT SYSTEM
   *
   * We also want to creaete a way to track actions and events in the app
   * so that when we are undoing and redoing we can also show the user what they did
   *
   */
  // const [layerId, setLayerId] = useSelectedLayer()

  // console.log('TOOLS: \n', { layerId })
  /**
   * TODO: FEATURE MANAGER
   *
   * We need a component / hook that will check for env variable and feature flags
   * This will allow us to toggle features on and off
   * and show new features to users before they are ready
   * and allow for a/b testing of feature (should also be using metrics for this to be useful)
   *
   * check env['FEATURE_VERSION'] on app load
   * then check local storage for 'FEATURE_VERSION'
   * if local storage version is less than env version
   * update local storage version
   * then select features based on local storage version
   *
   * could also set a 'A' or 'B' flag for a/b testing
   *
   * should be able to then check these and gather metrics on usage
   *
   * v.1 features: solid, gradient, noise
   *
   * v.X features: pattern, shader, image, video, text
   */

  return (
    <div className={styles.tools}>
      <Button
        onClick={stateChange('Add Layer', () => {
          const id = makeID()
          setSelectedLayer(id)
          nav({
            search: {
              layerStack: [id],
              layerData: [{ id, type: 'solid', props: { color: 'black' } }],
            },
          })
          console.log({ id })
        })}
      >
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
