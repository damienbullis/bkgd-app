import { debounce, randomHex } from '@utils'
import { EventHandler } from '@state/events'
import { ArrowsCounterClockwise, PlusCircle } from '@phosphor-icons/react'
import { useEffect } from 'react'
import { Popover } from '@headlessui/react'
import { HoverText, ToggleButton } from '@shared'
import { GradientLayerType } from 'src/components/Layers/LayerTypeSchema'
import GradientStops from './GradientStops'

const deHandler = debounce(EventHandler, 200)

const LinearGradient = ({
  typeProps,
  selectedLayer,
}: {
  typeProps: GradientLayerType['props'] & { type: 'linear' }
  selectedLayer: string
}) => {
  const { deg, colorSpace, repeating, stops } = typeProps
  useEffect(() => {
    const _deg = document.querySelector<HTMLInputElement>('#degrees')
    const _oklab =
      document.querySelector<HTMLInputElement>('#color-space-oklab')
    const _Oklch =
      document.querySelector<HTMLInputElement>('#color-space-Oklch')
    const _repeating = document.querySelector<HTMLInputElement>('#repeating')
    if (_deg) _deg.value = String(deg)
    if (_oklab) _oklab.checked = colorSpace !== 'Oklch'
    if (_Oklch) _Oklch.checked = colorSpace === 'Oklch'
    if (_repeating) _repeating.checked = repeating || false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])
  return (
    <>
      {/* Head */}
      <div className="mb-2 flex flex-row items-center justify-start gap-2">
        <h4 className="-skew-x-6">LINEAR GRADIENT</h4>
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
                  type: 'linear',
                  stops: [...(stops || []), [randomHex(), null, null]],
                },
              },
            })
          }
        >
          <PlusCircle size="2em" />
        </button>
      </div>
      <div className="flex w-full flex-row items-center justify-stretch gap-4">
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
                      type: 'linear',
                      deg: Number(e.target.value),
                    },
                  },
                })
              }}
            />
          </Popover.Panel>
        </Popover>

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
                    type: 'linear',
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
                    type: 'linear',
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
        type="linear"
      />
    </>
  )
}

export default LinearGradient
