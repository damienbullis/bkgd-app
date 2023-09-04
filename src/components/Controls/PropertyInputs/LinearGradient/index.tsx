import { debounce } from '@utils'
import { EventHandler } from '@state/events'
import { ArrowsCounterClockwise } from '@phosphor-icons/react'
import { useEffect } from 'react'
import { Popover } from '@headlessui/react'
import { ToggleButton } from '@shared'
import { LinearGradientPropsType, GradientStopsType } from './_helpers'
import LinearGradientStops from './GradientStops'

const deHandler = debounce(EventHandler, 200)

const LinearGradient = ({
  typeProps,
  selectedLayer,
}: {
  typeProps: LinearGradientPropsType
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
      <div className="flex flex-row items-center justify-start gap-2">
        <h4 className="-skew-x-6 bg-gradient-to-r from-pink-500 to-purple-500 to-[150%] bg-clip-text text-transparent">
          LINEAR GRADIENT
        </h4>

        <label className="ml-auto text-[10px] text-gray-300">Color Space</label>
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
      </div>

      <div className="mb-2 flex w-full flex-row items-center justify-stretch gap-4">
        <div className="inline-flex items-center">
          <label className="text-[10px] text-gray-300">Angle</label>
          <Popover className="relative">
            <Popover.Button className="ml-2">{deg || 360}°</Popover.Button>
            <Popover.Panel className="absolute z-10 rounded-md bg-[#00000099] px-4 py-2 shadow-2xl shadow-black backdrop-brightness-50">
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
        </div>
        <div
          className="flex w-full cursor-pointer flex-row items-center justify-end"
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
                  type: 'linear',
                  repeating: !repeating,
                },
              },
            })
          }}
        >
          <label className="text-[10px] text-gray-300">Repeating</label>
          <ArrowsCounterClockwise
            id="repeating-icon"
            className="ml-2 text-2xl hover:scale-105 focus:scale-95 active:scale-95"
          />
        </div>
      </div>

      <LinearGradientStops stops={stops || []} selectedLayer={selectedLayer} />
    </>
  )
}

export type { LinearGradientPropsType, GradientStopsType }

export default LinearGradient
