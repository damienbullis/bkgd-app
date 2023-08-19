import styles from './BackgroundRepeat.module.css'
import { Select } from '@shared'

const label = 'Background Repeat'

const options = [
  'repeat',
  'repeat-x',
  'repeat-y',
  'no-repeat',
  { value: 'space', label: 'Space' },
  { value: 'round', label: 'Round' },
]

export default function BackgroundRepeat({
  value = 'repeat',
}: {
  value?: string
}) {
  return (
    <div className={styles.wrap}>
      <label htmlFor={label} className={styles.full}>
        {label}
      </label>
      <Select
        id="backgroundRepeat"
        label={label}
        hideLabel
        options={options}
        value={value}
      />
    </div>
  )
}
