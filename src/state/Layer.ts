import { useCallback, useEffect, useMemo, useState } from 'react'
import SubStore from './subStore'

const ActiveLayerID = new SubStore('')

const Layer = {
  ActiveLayerID,
} as const

type Layer = typeof Layer
type LayerStore<T extends keyof Layer> = Layer[T]
type ValueType<T> = T extends SubStore<infer Value> ? Value : never

const useLayer = <T extends keyof Layer, V extends ValueType<LayerStore<T>>>(
  selector: T
) => {
  const store = useMemo(
    () => Layer[selector] as unknown as SubStore<V>,
    [selector]
  )

  const [_state, setState] = useState(store.value())

  useEffect(() => {
    const [unsubscribe] = store.subscribe((state) => setState(state))
    return () => unsubscribe()
  }, [selector, store])

  const setter = useCallback<(data: V) => void>(
    (state) => store.publish(state),
    [store]
  )

  return [_state, setter] as const
}

export { Layer, useLayer }
