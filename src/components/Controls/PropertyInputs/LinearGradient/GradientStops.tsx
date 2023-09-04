import { EventHandler } from '@state/events'
import GradientStop from './GradientStop'
import { GradientStopsType } from './_helpers'
import { debounce, randomHex } from '@utils'
import { PlusCircle } from '@phosphor-icons/react'

const deHandler = debounce(EventHandler, 200)

const LinearGradientStops = ({
  stops = [],
  selectedLayer,
}: {
  stops: GradientStopsType[]
  selectedLayer: string
}) => {
  return (
    <div className="justify-starts flex w-full flex-col items-stretch">
      {stops.map(([color, opacity, stop], i) => (
        <GradientStop
          key={i}
          index={i}
          color={color}
          opacity={opacity}
          stop={stop}
          allStops={stops}
          selectedLayer={selectedLayer}
        />
      ))}
      <div className="flex w-full flex-row items-center justify-end p-2">
        <button
          className="grid place-content-center rounded-full p-1 text-3xl text-gray-300 transition
        hover:text-white active:scale-95 active:text-white"
          onClick={() =>
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'linear',
                  stops: [...stops, [randomHex(), null, null]],
                },
              },
            })
          }
        >
          <PlusCircle />
        </button>
      </div>
    </div>
  )
}

export default LinearGradientStops
