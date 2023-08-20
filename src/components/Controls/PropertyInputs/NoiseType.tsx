import { debounce } from '@utils'
import styles from './NoiseType.module.css'
import { EventHandler } from '@state/events'
import { useSelectedLayer } from '@state/global'
import { useEffect, useRef } from 'react'

type NoiseTypeProps = {
  type?: 'fractalNoise' | 'turbulence'
  frequency?: string
  octaves?: string
  stitch?: 'stitch' | 'noStitch'
}

const deHandler = debounce(EventHandler, 200)

const NoiseType = ({ typeProps }: { typeProps: NoiseTypeProps }) => {
  const freqRef = useRef<HTMLInputElement>(null)
  const octRef = useRef<HTMLInputElement>(null)

  const [selectedLayer] = useSelectedLayer()
  useEffect(() => {
    if (freqRef.current && octRef.current) {
      freqRef.current.value = typeProps.frequency || '0.65'
      octRef.current.value = typeProps.octaves || '3'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])

  const {
    type = 'fractalNoise',
    frequency = '0.65',
    octaves = '3',
    stitch = 'stitch',
  } = typeProps

  return (
    <div className={styles.wrap}>
      <span>
        <label htmlFor="fractalNoise">Fractal</label>
        <input
          type="radio"
          className="clr"
          id="fractalNoise"
          value="fractalNoise"
          checked={type === 'fractalNoise'}
          onChange={() =>
            EventHandler({
              action: 'bkgd-update-layer',
              payload: { id: selectedLayer, props: { type: 'fractalNoise' } },
            })
          }
        />
      </span>
      <span>
        <label htmlFor="turbulence">Turbulence</label>
        <input
          type="radio"
          className="clr"
          id="turbulence"
          value="turbulence"
          checked={type === 'turbulence'}
          onChange={() =>
            EventHandler({
              action: 'bkgd-update-layer',
              payload: { id: selectedLayer, props: { type: 'turbulence' } },
            })
          }
        />
      </span>
      <label htmlFor="frequency" style={{ marginTop: '.5rem' }}>
        Frequency
      </label>
      <input
        ref={freqRef}
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue={frequency}
        onChange={(e) =>
          deHandler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              props: {
                type,
                frequency: e.target.value,
              },
            },
          })
        }
        id="frequency"
      />
      <label htmlFor="octaves" style={{ marginTop: '.5rem' }}>
        Octaves
      </label>
      <input
        ref={octRef}
        className="clr"
        style={{ marginBottom: '1rem' }}
        type="range"
        min="1"
        max="10"
        step="1"
        defaultValue={octaves}
        onChange={(e) =>
          deHandler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              props: {
                type,
                octaves: e.target.value,
              },
            },
          })
        }
        id="octaves"
      />
      <span>
        <label htmlFor="stitch">Stitch</label>
        <input
          type="radio"
          id="stitch"
          value="stitch"
          checked={stitch === 'stitch'}
          onChange={() =>
            EventHandler({
              action: 'bkgd-update-layer',
              payload: { id: selectedLayer, props: { type, stitch: 'stitch' } },
            })
          }
        />
      </span>
      <span>
        <label htmlFor="noStitch">No Stitch</label>
        <input
          type="radio"
          id="noStitch"
          className="clr"
          value="noStitch"
          checked={stitch === 'noStitch'}
          onChange={() =>
            EventHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                props: { type, stitch: 'noStitch' },
              },
            })
          }
        />
      </span>
    </div>
  )
}

export default NoiseType
