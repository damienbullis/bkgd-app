import { useEffect, useState } from 'react'
import styles from './BackgroundSize.module.css'
import { Select } from '../_shared/Input'
import { EventHandler } from '@state/events'
import { useSelectedLayer } from '@state/global'

type BackgroundSizeType =
  | 'auto auto'
  | `${string}%`
  | `${string}% ${string}%`
  | `${string}% auto`
  | `auto ${string}%`

type SizeOptions = 'default' | 'single' | 'double'

const SIZE_OPTIONS = [
  'auto',
  '50%',
  '100%',
  '200%',
  '300%',
  '400%',
  '500%',
  '1000%',
] as const

const options = [...SIZE_OPTIONS]

const getSizeValue = (value: string): [string, string] => {
  if (value === 'auto') return ['auto', 'auto']
  if (/\s/.test(value)) {
    const [x, y] = value.split(' ')
    return [x, y]
  }
  return [value, value]
}

const SizeController = ({
  type,
  selectedLayer,
  value = 'auto auto',
}: {
  type: SizeOptions
  selectedLayer: string
  value?: BackgroundSizeType
}) => {
  // [x, y]
  const [double, setDouble] = useState<[string, string]>(getSizeValue(value))
  useEffect(() => {
    setDouble(getSizeValue(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])
  const handler = (e: React.ChangeEvent<HTMLSelectElement>, index: 0 | 1) => {
    setDouble((prev) => {
      const next = [...prev]
      next[index] = e.target.value
      EventHandler({
        action: 'bkgd-update-layer',
        payload: {
          id: selectedLayer,
          backgroundSize: next.join(' '),
        },
      })
      return next as [string, string]
    })
  }

  if (type === 'default') return null
  if (type === 'single') {
    return (
      <Select
        label="Size"
        options={options}
        value={value || 'auto'}
        onChange={(e) =>
          EventHandler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              backgroundSize: e.target.value,
            },
          })
        }
      />
    )
  }
  return (
    <>
      <Select
        label="Size X"
        options={options}
        value={double[0]}
        onChange={(e) => handler(e, 0)}
      />
      <Select
        label="Size Y"
        options={options}
        value={double[1]}
        onChange={(e) => handler(e, 1)}
      />
    </>
  )
}

const label = 'Background Size'

const getValue = (value: string): SizeOptions => {
  if (value === 'auto auto') return 'default'
  if (/\s/.test(value)) return 'double'
  return 'single'
}

export default function BackgroundSize({ value = 'auto' }: { value?: string }) {
  const [sizeType, setSizeType] = useState<SizeOptions>(getValue(value))
  const [selectedLayer] = useSelectedLayer()
  useEffect(() => {
    setSizeType(getValue(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])

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
      <SizeController
        type={sizeType}
        value={value as BackgroundSizeType}
        selectedLayer={selectedLayer}
      />
    </div>
  )
}
