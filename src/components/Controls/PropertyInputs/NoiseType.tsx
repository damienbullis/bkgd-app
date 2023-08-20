import styles from './NoiseType.module.css'

type NoiseTypeProps = {
  type?: 'fractalNoise' | 'turbulence'
  frequency?: string
  octaves?: string
  stitch?: 'stitch' | 'noStitch'
}

const label = 'Noise'

const NoiseType = ({ typeProps }: { typeProps: NoiseTypeProps }) => {
  const {
    type = 'fractalNoise',
    frequency = '0.65',
    octaves = '3',
    stitch = 'stitch',
  } = typeProps
  console.log('NoiseType', { type, frequency, octaves, stitch })

  return (
    <div className={styles.wrap}>
      <h5 className={styles.full}>{label}</h5>
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
        style={{ marginBottom: '1rem' }}
        type="range"
        min="1"
        max="10"
        step="1"
        defaultValue={octaves}
        id="octaves"
      />
      <span>
        <label htmlFor="stitch">Stitch</label>
        <input
          type="radio"
          id="stitch"
          value="stitch"
          checked={stitch === 'stitch'}
          onChange={(e) => console.log(e.target.value)}
        />
      </span>
      <span>
        <label htmlFor="noStitch">No Stitch</label>
        <input
          type="radio"
          id="noStitch"
          value="noStitch"
          checked={stitch === 'noStitch'}
          onChange={(e) => console.log(e.target.value)}
        />
      </span>
    </div>
  )
}

export default NoiseType
