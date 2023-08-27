import { CircleHalf, Palette, Waveform } from '@phosphor-icons/react'
import { EventHandler } from '@state/events'
import { Button } from '@shared'
import { makeID } from '@utils'
import styles from './_.module.css'

const Tools = () => {
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
   *
   * # REFACTOR: Convert all encompassing tool types to individual tools
   *
   * - Gradient -> Linear, Radial, Conic
   * - Filter -> Blur, Drop Shadow, etc
   * - Combined -> ??? What would this look like?
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
        <Waveform size={32} />
      </Button>
      {/* OTHER BUTTONS 
        Conic Gradient <ArrowClockwise size={32} />  
        Radial Gradient <CircleHalf size={32} />
        Linear Gradient <ArrowFatLinesRight size={32} />
      */}
    </div>
  )
}

export default Tools
