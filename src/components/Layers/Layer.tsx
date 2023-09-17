import {
  CircleHalf,
  ClockCountdown,
  Palette,
  Record,
  TrashSimple,
  Waveform,
} from '@phosphor-icons/react'
import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'

import { Reorder } from 'framer-motion'
import { LayerType } from '@types'
import { KeyboardEvents } from '@state/keyEvents'

const LAYER_TYPES = {
  linear: CircleHalf,
  radial: Record,
  conic: ClockCountdown,
  noise: Waveform,
  solid: Palette,
} as const

const LayerButton = ({
  data,
  keys,
}: {
  data: LayerType
  keys: KeyboardEvents
}) => {
  const layerType = data.type === 'gradient' ? data.props.type : data.type
  const Icon = LAYER_TYPES[layerType]
  const [selectedLayer] = useSelectedLayer()

  return (
    <Reorder.Item
      value={data}
      onDrag={() => {
        if (keys.getState().ctrlKey) {
          const el = document.querySelector(`#layer-${data.id}`)
          if (el) {
            el.setAttribute('data-dragging', 'true')
          }
        }
      }}
      onDragEnd={() => {
        if (keys.getState().ctrlKey) {
          EventHandler({
            action: 'bkgd-dupe-layer',
            payload: data,
          })
        }
        const el = document.querySelector(`#layer-${data.id}`)
        if (el) {
          el.setAttribute('data-dragging', 'false')
        }
      }}
    >
      <div
        id={`layer-${data.id}`}
        data-dragging="false"
        data-active={data.id === selectedLayer}
        className="group inline-flex w-full cursor-grab items-center 
        justify-start gap-2 rounded-md p-4 py-3 backdrop-blur-md backdrop-brightness-50 
        backdrop-filter hover:backdrop-brightness-75 active:cursor-grabbing 
        data-[dragging='true']:cursor-copy
        data-[active='true']:bg-white data-[active='true']:text-black"
        onClick={() =>
          EventHandler({ action: 'select-layer', payload: { id: data.id } })
        }
      >
        <Icon className="text-xl" />
        <p
          className="max-w-3/4 m-0 mx-2 text-ellipsis whitespace-nowrap uppercase"
          style={{ fontFamily: 'var(--font-impact)' }}
        >
          {layerType}
        </p>
        <TrashSimple
          onClick={(e) => {
            e.stopPropagation()
            EventHandler({
              action: 'bkgd-remove-layer',
              payload: { id: data.id },
            })
          }}
          className="ml-auto cursor-pointer select-none text-xl opacity-0 transition-opacity group-hover:select-auto group-hover:opacity-100"
        />
      </div>
    </Reorder.Item>
  )
}

export default LayerButton
