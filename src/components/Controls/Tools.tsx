import { CircleHalf, Gradient, Palette } from '@phosphor-icons/react'
import { EventHandler } from '@state/events'
import { Button } from '@shared'
import { makeID } from '@utils'
import styles from './_.module.css'

const Tools = () => {
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
        onClick={() =>
          EventHandler({
            action: 'bkgd-add-layer',
            payload: {
              id: makeID(),
              type: 'solid',
            },
          })
        }
      >
        <Palette size={32} />
      </Button>

      <Button
        onClick={() =>
          EventHandler({
            action: 'bkgd-add-layer',
            payload: {
              id: makeID(),
              type: 'gradient',
            },
          })
        }
      >
        <CircleHalf size={32} />
      </Button>

      <Button
        onClick={() =>
          EventHandler({
            action: 'bkgd-add-layer',
            payload: {
              id: makeID(),
              type: 'noise',
            },
          })
        }
      >
        <Gradient size={32} />
      </Button>
    </div>
  )
}

export default Tools
