import { useState } from 'react'
import { Reorder } from 'framer-motion'

import { useLayers } from '@state/hooks'
import { EventHandler } from '@state/events'

import debounce from '../../utils/debounce'
import { LayerType } from './LayerTypeSchema'
import LayerButton from './Layer'

const deHandler = debounce(EventHandler, 200)

const LayerButtons = () => {
  const { layers } = useLayers()
  const [vLayers, setVLayers] = useState(layers)

  return (
    <Reorder.Group
      values={vLayers}
      onReorder={(next: LayerType[]) => {
        deHandler({
          action: 'bkgd-update-stack',
          payload: { stack: next.map((l) => l.id) },
        })
        setVLayers(next)
      }}
      as="ul"
      className="flex w-full flex-col items-stretch justify-center gap-2"
    >
      {vLayers.map((layer) => {
        if (!layer) return null
        return <LayerButton key={layer.id} data={layer} />
      })}
    </Reorder.Group>
  )
}

export default LayerButtons
