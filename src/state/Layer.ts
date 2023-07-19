import { useCallback, useEffect, useMemo, useState } from 'react'
import SubStore from './subStore'

const ActiveLayerID = new SubStore('')

const Layer = {
  ActiveLayerID,
} as const

type Layer = typeof Layer
type LayerStore<T extends keyof Layer> = Layer[T]

const useLayer = <Key extends keyof Layer>(selector: Key) => {
  const store = useMemo(() => Layer[selector], [selector])

  const [_state, setState] = useState(store.value())

  useEffect(() => {
    const [unsubscribe] = store.subscribe((state) => setState(state))
    return () => unsubscribe()
  }, [selector, store])

  const setter = useCallback<LayerStore<Key>['publish']>(
    (state) => store.publish(state),
    [store]
  )

  return [_state, setter] as const
}

export { useLayer }
