import { useState } from 'react'
import { Switch } from '@headlessui/react'

type ToggleButtonProps = {
  onLabel: string
  offLabel: string
  onChange: (value: boolean) => void
  defaultValue?: string
}

function ToggleButton({
  onLabel,
  offLabel,
  onChange,
  defaultValue,
}: ToggleButtonProps) {
  const [enabled, setEnabled] = useState(defaultValue === onLabel || false)

  return (
    <Switch
      checked={enabled}
      onChange={(v) => {
        setEnabled(v)
        onChange(v)
      }}
      className={`${
        enabled ? 'bg-purple-700' : 'bg-pink-700'
      } relative inline-flex h-6 w-[100px] items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? 'translate-x-[80px]' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
      <span
        className={`absolute uppercase transition ${
          enabled ? 'left-2 translate-x-1' : 'right-2 -translate-x-1'
        }`}
      >
        {enabled ? onLabel : offLabel}
      </span>
    </Switch>
  )
}

export default ToggleButton
