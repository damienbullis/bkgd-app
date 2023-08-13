import { useState } from 'react'
import styles from './BackgroundSize.module.css'
import { Select } from '../_shared/Input'

type BackgroundSizeType = 'auto auto' | `${string}%` | `${string}% ${string}%`

type SizeOptions = 'default' | 'single' | 'double'

const SizeController = ({
  type,
  value = 'auto auto',
}: {
  type: SizeOptions
  value?: BackgroundSizeType
}) => {
  console.log({ value })

  if (type === 'default') return null
  if (type === 'single') {
    return (
      <Select
        label="Size"
        options={['auto', '25%', '50%', '75%', '100%']}
        value="auto"
        onChange={(e) => console.log(e)}
      />
    )
  }
  return (
    <>
      <Select
        label="Size X"
        options={['auto', '25%', '50%', '75%', '100%']}
        value="auto"
        onChange={(e) => console.log(e)}
      />
      <Select
        label="Size Y"
        options={['auto', '25%', '50%', '75%', '100%']}
        value="auto"
        onChange={(e) => console.log(e)}
      />
    </>
  )
}

const label = 'Background Size'

export default function BackgroundSize({ value }: { value?: string }) {
  const [sizeType, setSizeType] = useState<SizeOptions>('default')
  return (
    <div className={styles.wrap}>
      <label htmlFor={label}>{label}</label>
      <Select
        id={label}
        label="Size"
        hideLabel
        options={['default', 'single', 'double']}
        value={sizeType}
        onChange={(e) => setSizeType(e.target.value as SizeOptions)}
      />
      <SizeController type={sizeType} value={value as BackgroundSizeType} />
    </div>
  )
}
