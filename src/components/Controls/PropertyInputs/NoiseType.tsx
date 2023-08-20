import styles from './NoiseType.module.css'

type NoiseTypeProps = {
  type?: 'fractalNoise' | 'turbulence'
  frequency?: string
  octaves?: string
  stitch?: 'stitch' | 'noStitch'
  width?: number
  height?: number
}

const label = 'Noise'

const NoiseType = ({
  type = 'fractalNoise',
  frequency = '0.65',
  octaves = '3',
  stitch = 'stitch',
  width = 500,
  height = 500,
}: NoiseTypeProps) => {
  console.log('NoiseType', { type, frequency, octaves, stitch, width, height })

  return (
    <div className={styles.wrap}>
      <label htmlFor={label} className={styles.full}>
        {label}
      </label>
      <span>
        <label htmlFor="fractalNoise">Fractal</label>
        <input
          type="radio"
          id="fractalNoise"
          value="fractalNoise"
          checked={type === 'fractalNoise'}
          onChange={(e) => console.log(e)}
        />
      </span>
      <span>
        <label htmlFor="turbulence">Turbulence</label>
        <input
          type="radio"
          id="turbulence"
          value="turbulence"
          checked={type === 'turbulence'}
          onChange={(e) => console.log(e.target.value)}
        />
      </span>
      <label htmlFor="frequency" style={{ marginTop: '.5rem' }}>
        Frequency
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue={frequency}
        id="frequency"
      />
      <label htmlFor="octaves" style={{ marginTop: '.5rem' }}>
        Octaves
      </label>
      <input
        type="range"
        min="1"
        max="10"
        step="1"
        defaultValue={octaves}
        id="octaves"
      />
    </div>
  )
}

export default NoiseType
