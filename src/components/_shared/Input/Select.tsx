import { EventHandler } from '@state/events'
import { debounce } from '@utils'
import styles from './_.module.css'
import { useSelectedLayer } from '@state/global'
import { useCallback } from 'react'
import { Listbox } from '@headlessui/react'
import { CaretUpDown, Check } from '@phosphor-icons/react'

const handler = debounce(EventHandler, 200)

/**
 * Select Input Type
 */
export default function Select({
  label,
  id,
  options,
  value,
  onChange,
}: {
  id: string
  options: (string | { value: string; label: string })[]
  label?: string
  value?: string
  /**
   * Optional onChange handler
   *
   * this will override the default EventHandler
   */
  onChange?(e: string): void
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
      {typeof label === 'string' && (
        <Listbox.Label className="bkgd-font-xs block font-medium leading-6 text-gray-300">
          {label}
        </Listbox.Label>
      )}
      <div className="relative">
        <Listbox.Button
          className="bkgd-font-xs relative h-10 w-full cursor-pointer rounded-md
          py-1.5 pl-3 pr-10 text-left text-white shadow-sm ring-1 ring-inset ring-gray-300 
          hover:ring-white focus:ring-white ui-open:rounded-b-none ui-open:ring-white sm:text-sm sm:leading-6"
        >
          <span className="block truncate uppercase">{value}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <CaretUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options
          className="absolute z-10 mt-0 max-h-56 w-full overflow-auto rounded-md rounded-tl-none bg-gray-950  
          bg-opacity-90 py-4 text-base shadow-lg sm:text-sm"
        >
          {options.map((option) => (
            <Listbox.Option
              className="relative cursor-pointer select-none py-2 pl-3 pr-9 uppercase ui-active:bg-pink-500"
              key={typeof option === 'string' ? option : option.value}
              value={typeof option === 'string' ? option : option.value}
            >
              {({ selected, active }) => (
                <>
                  {typeof option === 'string' ? option : option.label}
                  {selected && (
                    <span
                      className={`${active ? 'text-white' : 'text-pink-500'}
                      absolute inset-y-0 right-0 flex items-center pr-4`}
                    >
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
