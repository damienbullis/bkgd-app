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

const LAYER_TYPES = {
  linear: CircleHalf,
  radial: Record,
  conic: ClockCountdown,
  noise: Waveform,
  solid: Palette,
} as const

const LayerButton = ({
  id,
  type,
}: {
  id: string
  type: keyof typeof LAYER_TYPES
}) => {
  const Icon = LAYER_TYPES[type]
  const layerRef = useRef<HTMLDivElement>(null)
  const [selectedLayer] = useSelectedLayer()
  const { layerStack = [] } = useSearch({ from: '/' })
  const isActive = id === selectedLayer
  return (
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
      onClick={() => EventHandler({ action: 'select-layer', payload: { id } })}
    >
      <Icon className="text-xl" />
      <p
        className="max-w-3/4 m-0 mx-2 text-ellipsis whitespace-nowrap uppercase"
        style={{ fontFamily: 'var(--font-impact)' }}
      >
        {type}
      </p>
      <LayerDropdown id={id} isActive={isActive} stack={layerStack} />
    </div>
  )
}

export default LayerButton
