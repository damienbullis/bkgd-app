import { useCallback, useContext, useEffect, useState } from 'react'
import { Reorder } from 'framer-motion'

import { useLayers } from '@state/hooks'
import { EventHandler } from '@state/events'
import { LayerType } from '@types'
import { debounce } from '@utils'

import LayerButton from './Layer'
import { KeyEventsContext } from '@state/keyEvents'

const deHandler = debounce(EventHandler, 200)

const LayerButtons = () => {
  const { layers } = useLayers()
  const [vLayers, setVLayers] = useState(layers)

  const keys = useContext(KeyEventsContext)

  const reorderHandler = useCallback(
    (next: LayerType[]) => {
      setVLayers((prev) => {
        const holdingControl = keys.getState().ctrlKey
        if (holdingControl) {
          return prev
        }
        deHandler({
          action: 'bkgd-update-stack',
          payload: { stack: next.map((l) => l.id) },
        })
        return next
      })
    },
    [keys]
  )

  useEffect(() => {
    setVLayers(layers)
  }, [layers])

  return (
    <Reorder.Group
      values={vLayers}
      onReorder={reorderHandler}
      className="flex w-full flex-col items-stretch justify-center gap-2"
      as="ul"
    >
      {vLayers.map((layer) => {
        if (!layer) return null
        return <LayerButton key={layer.id} data={layer} keys={keys} />
      })}
    </Reorder.Group>
  )
}

export default LayerButtons
