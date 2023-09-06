import { useEffect, useRef } from 'react'
import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'
import { debounce } from '@utils'
import { HoverText, Range, ToggleButton } from '@shared'

import { NoiseLayerType } from '../../Layers/LayerTypeSchema'
import styles from './NoiseType.module.css'
import { Popover } from '@headlessui/react'

type NoiseTypeProps = NoiseLayerType['props']

const deHandler = debounce(EventHandler, 200)

const NoiseType = ({
  typeProps,
  opacity,
}: {
  typeProps: NoiseTypeProps
  opacity?: number
}) => {
  const freqRef = useRef<HTMLInputElement>(null)
  const octRef = useRef<HTMLInputElement>(null)

  const [selectedLayer] = useSelectedLayer()
  useEffect(() => {
    if (freqRef.current && octRef.current) {
      freqRef.current.value = typeProps.frequency || '0.65'
      octRef.current.value = typeProps.octaves || '3'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])

  const {
    type = 'fractalNoise',
    frequency = '0.65',
    octaves = '3',
    stitch = 'stitch',
  } = typeProps

  return (
    <>
      {/* Header */}
      <div className="mb-4 flex flex-row items-center justify-start gap-2">
        <h4 className="-skew-x-6 text-white">NOISE</h4>

        {/* Noise Type */}
        <div className="group relative ml-auto inline-flex items-center gap-2">
          <ToggleButton
            onLabel="fractal"
            offLabel="turbulence"
            defaultValue={type || 'fractal'}
            onChange={(e) =>
              EventHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  props: {
                    type: e ? 'fractalNoise' : 'turbulence',
                  },
                },
              })
            }
          />
          <HoverText>Type</HoverText>
        </div>

        {/* Opacity */}
        <div className="mr-4 flex min-w-[4rem] flex-row items-center justify-end gap-2">
          <Popover className="relative">
            <Popover.Button>
              <span className="group relative">
                {opacity ?? 100}%<HoverText>Opacity</HoverText>
              </span>
            </Popover.Button>
            <Popover.Panel className="absolute z-10 rounded-md bg-[#00000099] px-4 py-2 shadow-2xl shadow-black backdrop-brightness-50">
              <input
                id="opacity"
                type="range"
                defaultValue={opacity ?? 100}
                min={0}
                max={100}
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
                      type: 'solid',
                      opacity: Number(e.target.value),
                    },
                  })
                }}
              />
            </Popover.Panel>
          </Popover>
        </div>
      </div>

      <label htmlFor="frequency" style={{ marginTop: '.5rem' }}>
        Frequency
      </label>
      <input
        ref={freqRef}
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue={frequency}
        onChange={(e) =>
          deHandler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              props: {
                type,
                frequency: e.target.value,
              },
            },
          })
        }
        id="frequency"
      />
      <label htmlFor="octaves" style={{ marginTop: '.5rem' }}>
        Octaves
      </label>
      <input
        ref={octRef}
        className="clr"
        style={{ marginBottom: '1rem' }}
        type="range"
        min="1"
        max="10"
        step="1"
        defaultValue={octaves}
        onChange={(e) =>
          deHandler({
            action: 'bkgd-update-layer',
            payload: {
              id: selectedLayer,
              props: {
                type,
                octaves: e.target.value,
              },
            },
          })
        }
        id="octaves"
      />
      <span>
        <label htmlFor="stitch">Stitch</label>
        <input
          type="radio"
          id="stitch"
          value="stitch"
          checked={stitch === 'stitch'}
          onChange={() =>
            EventHandler({
              action: 'bkgd-update-layer',
              payload: { id: selectedLayer, props: { type, stitch: 'stitch' } },
            })
          }
        />
      </span>
      <span style={{ marginBottom: '.5rem' }}>
        <label htmlFor="noStitch">No Stitch</label>
        <input
          type="radio"
          id="noStitch"
          className="clr"
          value="noStitch"
          checked={stitch === 'noStitch'}
          onChange={() =>
            EventHandler({
              action: 'bkgd-update-layer',
              payload: {
                id: selectedLayer,
                props: { type, stitch: 'noStitch' },
              },
            })
          }
        />
      </span>
      <Range label="Opacity" id="opacity" value={opacity} />
    </>
  )
}

export default NoiseType
