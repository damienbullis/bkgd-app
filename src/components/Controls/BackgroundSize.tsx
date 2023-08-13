import { useState } from 'react'
import styles from './BackgroundSize.module.css'
import { Select } from '../_shared/Input'

type BackgroundSizeType = 'auto auto' | `${string}%` | `${string}% ${string}%`

type SizeOptions = 'default' | 'single' | 'double'

const SizeController = ({
  type,
  id,
  value,
}: {
  type: SizeOptions
  id: string
  value: BackgroundSizeType
}) => {
  console.log({ id, value })

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

export default function BackgroundSize({
  label,
  id = label,
  value = 'auto auto',
}: {
  label: string
  id?: string
  value?: BackgroundSizeType
}) {
  const [sizeType, setSizeType] = useState<SizeOptions>('default')
  return (
    <div className={styles.wrap}>
      <label htmlFor={label} className={styles.full}>
        {label}
      </label>
      <Select
        label="Size"
        options={['default', 'single', 'double']}
        value={sizeType}
        onChange={(e) => setSizeType(e.target.value as SizeOptions)}
      />
      <SizeController type={sizeType} id={id} value={value} />
    </div>
  )
}
