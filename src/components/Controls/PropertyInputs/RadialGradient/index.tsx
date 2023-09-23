import { GradientLayerType } from '@types'
import { debounce, randomHex } from '@utils'
import { EventHandler } from '@state/events'
import { HoverText, ToggleButton } from '@shared'
import { ArrowsCounterClockwise, PlusCircle } from '@phosphor-icons/react'
import GradientStops from '../GradientStops'
import RadialPosition from './RadialPosition'
import RadialSize from './RadialSize'

const deHandler = debounce(EventHandler, 200)

const RadialGradient = ({
  typeProps,
  selectedLayer,
}: {
  typeProps: GradientLayerType['props'] & { type: 'radial' }
  selectedLayer: string
}) => {
  const { position, size, colorSpace, repeating, stops } = typeProps

  return (
    <>
      {/* Header */}
      <div className="mb-4 flex flex-row items-center justify-start gap-2">
        <h4 className="-skew-x-6">RADIAL GRADIENT</h4>
        <label className="ml-auto text-sm text-gray-300">
          {(stops || []).length} Stops
        </label>
        <button
          className="grid place-content-center rounded-full p-1 text-base text-gray-300 transition
        hover:text-white active:scale-95 active:text-white"
          onClick={() =>
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'radial',
                  stops: [...(stops || []), [randomHex(), null, null]],
                },
              },
            })
          }
        >
          <PlusCircle size="2em" />
        </button>
      </div>
      <div className="my-2 flex w-full flex-row items-center justify-stretch gap-4">
        {/* Size */}
        <RadialSize size={size} selectedLayer={selectedLayer} />
        <label className="text-base text-gray-300">@</label>

        {/* Position */}
        <RadialPosition position={position} selectedLayer={selectedLayer} />

        {/* Color Space */}
        <div className="group relative ml-auto inline-flex items-center gap-2">
          <ToggleButton
            onLabel="oklab"
            offLabel="Oklch"
            defaultValue={colorSpace || 'oklab'}
            onChange={(v) =>
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'radial',
                    colorSpace: v ? 'oklab' : 'Oklch',
                  },
                },
              })
            }
          />
          <HoverText>Color Space</HoverText>
        </div>

        {/* Repeating Button */}
        <div
          className="group relative flex cursor-pointer flex-row items-center justify-end"
          onClick={() => {
            const el =
              document.querySelector<HTMLInputElement>('#repeating-icon')
            if (el) el.classList.toggle('text-fuchsia-500')
            deHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                type: 'gradient',
                props: {
                  type: 'radial',
                  repeating: !repeating,
                },
              },
            })
          }}
        >
          <ArrowsCounterClockwise
            id="repeating-icon"
            className="ml-2 text-2xl hover:scale-105 focus:scale-95 active:scale-95"
          />
          <HoverText>Repeat</HoverText>
        </div>
      </div>

      <div className="flex w-full flex-row items-center gap-4"></div>

      <GradientStops
        type="radial"
        selectedLayer={selectedLayer}
        stops={stops || []}
      />
    </>
  )
}

export default RadialGradient
