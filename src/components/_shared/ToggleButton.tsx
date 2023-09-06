import { useState } from 'react'
import { Switch } from '@headlessui/react'

type ToggleButtonProps = {
  onLabel: string
  offLabel: string
  onChange: (value: boolean) => void
  defaultValue?: string
  width?: number
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
      } relative inline-flex h-6 w-auto items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span className="appearance-none p-5 uppercase opacity-0">
        {enabled ? onLabel : offLabel}
      </span>
      <span
        className={`absolute inline-block h-4 w-4 transform rounded-full bg-white transition
        ${enabled ? `right-1` : 'left-1'}`}
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
