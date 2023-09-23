import { GradientLayerType } from '@types'
// import styles from './GradientType.module.css'
import { debounce, randomHex } from '@utils'
import { EventHandler } from '@state/events'
import { ArrowsCounterClockwise, PlusCircle } from '@phosphor-icons/react'
import { Popover } from '@headlessui/react'
import { HoverText, ToggleButton } from '@shared'
import GradientStops from '../GradientStops'
import ConicPosition from './ConicPosition'

const deHandler = debounce(EventHandler, 200)

type ConicGradientPropsType = GradientLayerType['props'] & { type: 'conic' }

const ConicGradient = ({
  typeProps,
  selectedLayer,
}: {
  typeProps: ConicGradientPropsType
  selectedLayer: string
}) => {
  const { position, colorSpace, repeating, stops, deg } = typeProps
  return (
    <>
      {/* Header */}
      <div className="mb-4 flex flex-row items-center justify-start gap-2">
        <h4 className="-skew-x-6">CONIC GRADIENT</h4>
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
                  type: 'conic',
                  stops: [...(stops || []), [randomHex(), null, null]],
                },
              },
            })
          }
        >
          <PlusCircle size="2em" />
        </button>
      </div>
      <div className="flex flex-row items-center justify-stretch gap-4">
        {/* Angle Slider */}
        <Popover className="relative">
          <span className="group relative">
            <Popover.Button>{deg || 360}°</Popover.Button>
            <HoverText>Angle</HoverText>
          </span>
          <Popover.Panel className="absolute z-10 rounded-md bg-black px-4 py-2 shadow-2xl shadow-black">
            <input
              id="degrees"
              type="range"
              defaultValue={deg || 360}
              min={1}
              max={360}
              className="
                appearance:none m-0 w-32 cursor-pointer rounded-full transition-all 
                [&::-webkit-slider-container]:h-2
                [&::-webkit-slider-container]:appearance-none
                [&::-webkit-slider-container]:rounded-full 
                [&::-webkit-slider-container]:bg-gray-500
                [&::-webkit-slider-container]:transition-colors
                hover:[&::-webkit-slider-container]:bg-gray-400
                active:[&::-webkit-slider-container]:bg-gray-50"
              onChange={(e) => {
                deHandler({
                  action: 'bkgd-update-layer',
                  payload: {
                    id: selectedLayer,
                    type: 'gradient',
                    props: {
                      type: 'conic',
                      deg: Number(e.target.value),
                    },
                  },
                })
              }}
            />
          </Popover.Panel>
        </Popover>

        <span className="text-base text-gray-300">@</span>

        <ConicPosition position={position} selectedLayer={selectedLayer} />

        {/* Color Space Toggle */}
        <div className="group relative ml-auto flex items-center">
          <ToggleButton
            onLabel="oklab"
            offLabel="oklch"
            defaultValue={colorSpace || 'oklab'}
            onChange={(v) =>
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'conic',
                    colorSpace: v ? 'Oklch' : 'oklab',
                  },
                },
              })
            }
          />
          <HoverText>Color Space</HoverText>
        </div>

        {/* Repeating Button */}
        <label className="group relative ml-2 inline-flex cursor-pointer">
          <ArrowsCounterClockwise
            id="repeating-icon"
            className={`text-2xl transition-all hover:scale-105  focus:scale-95 active:scale-95 
              ${repeating ? 'text-fuchsia-500' : 'text-gray-300'}`}
          />
          <input
            className="peer appearance-none"
            type="checkbox"
            id="repeating"
            defaultChecked={repeating}
            onChange={(e) => {
              const el =
                document.querySelector<HTMLDivElement>('#repeating-icon')
              if (el) {
                el.classList.toggle('text-fuchsia-500')
                el.classList.toggle('text-gray-300')
              }
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'conic',
                    repeating: e.target.checked,
                  },
                },
              })
            }}
          />
          <HoverText>Repeat</HoverText>
        </label>
      </div>

      {/* Stops */}
      <GradientStops
        stops={stops || []}
        selectedLayer={selectedLayer}
        type="conic"
      />
    </>
  )
}

export default ConicGradient
