import {
  CircleHalf,
  ClockCountdown,
  Palette,
  Record,
  Waveform,
} from '@phosphor-icons/react'
import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'

import LayerDropdown from './LayerDropdown'
import { useSearch } from '@tanstack/router'
import { useRef } from 'react'
import { Reorder, useDragControls } from 'framer-motion'
import { LayerType } from '../LayerTypeSchema'

const LAYER_TYPES = {
  linear: CircleHalf,
  radial: Record,
  conic: ClockCountdown,
  noise: Waveform,
  solid: Palette,
} as const

const LayerButton = ({ data }: { data: LayerType }) => {
  const layerType = data.type === 'gradient' ? data.props.type : data.type
  // const dragControls = useDragControls()
  const Icon = LAYER_TYPES[layerType]
  const layerRef = useRef<HTMLDivElement>(null)
  const [selectedLayer] = useSelectedLayer()
  // const { layerStack = [] } = useSearch({ from: '/' })
  const isActive = data.id === selectedLayer
  return (
    <Reorder.Item value={data}>
      <div
        ref={layerRef}
        data-active={isActive}
        onMouseEnter={() => {
          layerRef.current?.classList.remove('backdrop-brightness-50')
          layerRef.current?.classList.add('backdrop-brightness-75')
        }}
        onMouseLeave={() => {
          layerRef.current?.classList.add('backdrop-brightness-50')
          layerRef.current?.classList.remove('backdrop-brightness-75')
        }}
        className="data=[active='true']:text-black inline-flex w-full 
        cursor-pointer items-center justify-start gap-2 rounded-md p-4 py-3 
        backdrop-blur-md backdrop-brightness-50 backdrop-filter
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
      </div>
    </Reorder.Item>
  )
}

export default LayerButton
