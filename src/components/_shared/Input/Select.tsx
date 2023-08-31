import { EventHandler } from '@state/events'
import { debounce } from '@utils'
import styles from './_.module.css'
import { useSelectedLayer } from '@state/global'
import { useCallback } from 'react'
import { Listbox } from '@headlessui/react'
import { CaretUp, CaretUpDown, Check } from '@phosphor-icons/react'

const handler = debounce(EventHandler, 200)

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Select Input Type
 */
export default function Select({
  label,
  id = label,
  options,
  value,
  onChange,
  hideLabel = false,
}: {
  label: string
  options: (string | { value: string; label: string })[]
  id?: string
  value?: string
  /**
   * Optional onChange handler
   *
   * this will override the default EventHandler
   */
  onChange?(e: string): void
  hideLabel?: boolean
}) {
  const [selectedLayer] = useSelectedLayer()

  const cb = useCallback(
    (e: string) => {
      handler({
        action: 'bkgd-update-layer',
        payload: {
          id: selectedLayer,
          [id]: e,
        },
      })
    },
    [id, selectedLayer]
  )
  return (
    <Listbox value={value} onChange={onChange || cb}>
      {!hideLabel && (
        <Listbox.Label className="bkgd-font-xs block font-medium leading-6 text-gray-300">
          {label}
        </Listbox.Label>
      )}
      <div className="relative">
        <Listbox.Button className="bkgd-font-xs relative h-10 w-full cursor-pointer rounded-md py-1.5 pl-3 pr-10 text-left text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
          <span className="block truncate uppercase">{value}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <CaretUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-2 max-h-56 w-full overflow-auto rounded-md bg-gray-900 py-4 text-base shadow-lg ring-1 ring-gray-300 ring-opacity-5 focus:outline-none sm:text-sm">
          {options.map((option) => (
            <Listbox.Option
              className="ui-active:bg-pink-500 cursor-pointer select-none py-2 pl-3 pr-9 uppercase text-white"
              key={typeof option === 'string' ? option : option.value}
              value={typeof option === 'string' ? option : option.value}
            >
              {({ selected }) => (
                <>
                  {typeof option === 'string' ? option : option.label}
                  {selected && (
                    <span className="ui-active:text-white absolute inset-y-0 right-0 flex items-center pr-4 text-pink-500">
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
